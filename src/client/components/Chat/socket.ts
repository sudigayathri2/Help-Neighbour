// src/client/components/Chat/socket.ts
import { io, Socket } from "socket.io-client";

const CHAT_SERVER_URL = import.meta.env.VITE_CHAT_SERVER_URL || "http://localhost:4000";

let socket: Socket | null = null;

export function connectSocket(userId: string, userName: string): Socket {
  if (socket?.connected) return socket;

  socket = io(CHAT_SERVER_URL, {
    auth: { userId, userName },
    transports: ["websocket", "polling"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("✅ Chat connected");
  });

  socket.on("connect_error", (e) => {
    console.error("❌ Chat error:", e.message);
  });

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
}