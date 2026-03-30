// chat-server/server.js
// Deploy this on Railway (free): https://railway.app
// It connects to the SAME MongoDB Atlas you already have.

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { MongoClient } from "mongodb";

const app = express();
const httpServer = createServer(app);

// ─── MongoDB ──────────────────────────────────────────────────────────────────
const MONGO_URI ="mongodb://user43:user43@ac-euozzhg-shard-00-00.itamchr.mongodb.net:27017,ac-euozzhg-shard-00-01.itamchr.mongodb.net:27017,ac-euozzhg-shard-00-02.itamchr.mongodb.net:27017/?replicaSet=atlas-14nivq-shard-0&ssl=true&authSource=admin"
;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

if (!MONGO_URI) throw new Error("MONGODB_URI is missing");

let db;
async function connectDB() {
  const client = new MongoClient(MONGO_URI, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();
  db = client.db("helpneighbor"); // same DB name as your main app
  console.log("✅ Connected to MongoDB");
}

// ─── Socket.io ────────────────────────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

/**
 * Auth middleware — client sends their userId (same id stored in your AppContext).
 * No JWT needed, matches your existing x-user-id pattern.
 *
 * Client connects like:
 *   const socket = io(CHAT_SERVER_URL, { auth: { userId, userName } })
 */
io.use((socket, next) => {
  const { userId, userName } = socket.handshake.auth;
  if (!userId || !userName) {
    return next(new Error("userId and userName are required"));
  }
  socket.userId = userId;
  socket.userName = userName;
  next();
});

// ─── Online Users ─────────────────────────────────────────────────────────────
// userId → Set of socketIds (handles same user on multiple tabs)
const onlineUsers = new Map();

function addOnline(userId, socketId) {
  if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
  onlineUsers.get(userId).add(socketId);
}

function removeOnline(userId, socketId) {
  const sockets = onlineUsers.get(userId);
  if (!sockets) return;
  sockets.delete(socketId);
  if (sockets.size === 0) onlineUsers.delete(userId);
}

/** Emit an event to ALL sockets of a given userId */
function emitToUser(userId, event, data) {
  const sockets = onlineUsers.get(String(userId));
  if (!sockets) return;
  for (const socketId of sockets) {
    io.to(socketId).emit(event, data);
  }
}

// ─── Socket Events ────────────────────────────────────────────────────────────
io.on("connection", (socket) => {
  const userId = String(socket.userId);
  addOnline(userId, socket.id);

  console.log(`🟢 ${socket.userName} (${userId}) connected`);

  // Tell the newly connected user which people are currently online
  socket.emit("online_users", Array.from(onlineUsers.keys()));

  // ── send_message ────────────────────────────────────────────────────────────
  /**
   * Emitted by client:
   *   socket.emit("send_message", { taskId, receiverId, content })
   *
   * taskId   — ties the message to a specific task thread
   * receiverId — the other party's userId (helper or requester)
   * content  — the message text
   */
  socket.on("send_message", async ({ taskId, receiverId, content }) => {
    if (!taskId || !receiverId || !content?.trim()) return;

    const message = {
      taskId,
      senderId: userId,
      receiverId: String(receiverId),
      content: content.trim(),
      isRead: false,
      createdAt: new Date(),
    };

    try {
      // Save to MongoDB
      const result = await db.collection("messages").insertOne(message);

      const savedMessage = {
        ...message,
        id: result.insertedId.toString(),
        createdAt: message.createdAt.toISOString(),
      };

      // Deliver to receiver if online
      emitToUser(receiverId, "receive_message", savedMessage);

      // Confirm back to sender so it appears in their UI instantly
      socket.emit("message_sent", savedMessage);

    } catch (err) {
      console.error("Failed to save message:", err);
      socket.emit("message_error", { error: "Failed to send message" });
    }
  });

  // ── mark_read ───────────────────────────────────────────────────────────────
  /**
   * Emitted when a user opens a chat conversation:
   *   socket.emit("mark_read", { taskId, senderId })
   */
  socket.on("mark_read", async ({ taskId, senderId }) => {
    if (!taskId || !senderId) return;

    try {
      const result = await db.collection("messages").updateMany(
        {
          taskId,
          senderId: String(senderId),
          receiverId: userId,
          isRead: false,
        },
        { $set: { isRead: true } }
      );

      if (result.modifiedCount > 0) {
        // Notify the sender their messages were read (for ✓✓ receipt)
        emitToUser(senderId, "messages_read", { taskId, byUserId: userId });
      }
    } catch (err) {
      console.error("mark_read error:", err);
    }
  });

  // ── typing ──────────────────────────────────────────────────────────────────
  /**
   * Emitted while the user is typing:
   *   socket.emit("typing", { taskId, receiverId, isTyping: true/false })
   */
  socket.on("typing", ({ taskId, receiverId, isTyping }) => {
    emitToUser(receiverId, "typing", {
      taskId,
      senderId: userId,
      senderName: socket.userName,
      isTyping: Boolean(isTyping),
    });
  });

  // ── disconnect ──────────────────────────────────────────────────────────────
  socket.on("disconnect", () => {
    removeOnline(userId, socket.id);
    if (!onlineUsers.has(userId)) {
      io.emit("user_went_offline", { userId });
      console.log(`🔴 ${socket.userName} (${userId}) disconnected`);
    }
  });
});

// ─── Health Check (Railway needs this) ───────────────────────────────────────
app.get("/health", (_, res) => res.json({ ok: true, online: onlineUsers.size }));

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Chat server on port ${PORT}`);
  });
});