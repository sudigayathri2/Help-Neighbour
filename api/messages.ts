// api/messages.ts
// Drop this file into your existing api/ folder — Vercel handles the rest.
// Handles: fetch message history, unread counts per task.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../lib/db.js';
import { ObjectId } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');

  // Uses the same x-user-id auth pattern as your other api routes
  const callerId = req.headers['x-user-id'] as string;
  if (!callerId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { db } = await connectToDatabase();
    const messagesCollection = db.collection('messages');

    // ────────────────────────────────────────────────────────────────────────
    // GET /api/messages?taskId=xxx
    //   → Fetch conversation history for a task (used when chat opens)
    //
    // GET /api/messages?unread=true
    //   → Returns unread count per taskId (used for badges on TaskCards)
    // ────────────────────────────────────────────────────────────────────────
    if (req.method === 'GET') {
      const { taskId, unread, before, limit: limitStr } = req.query;

      // Unread counts for all tasks
      if (unread === 'true') {
        const counts = await messagesCollection.aggregate([
          {
            $match: {
              receiverId: callerId,
              isRead: false,
            },
          },
          {
            $group: {
              _id: '$taskId',
              count: { $sum: 1 },
            },
          },
        ]).toArray();

        // Shape: { [taskId]: count }
        const result: Record<string, number> = {};
        for (const row of counts) {
          result[row._id] = row.count;
        }
        return res.status(200).json(result);
      }

      // Conversation history for a specific task
      if (!taskId) {
        return res.status(400).json({ error: 'taskId is required' });
      }

      const limit = Math.min(parseInt(limitStr as string) || 50, 200);

      const query: any = {
        taskId,
        $or: [
          { senderId: callerId },
          { receiverId: callerId },
        ],
      };

      // Pagination: load messages before a certain timestamp
      if (before) {
        query.createdAt = { $lt: new Date(before as string) };
      }

      const messages = await messagesCollection
        .find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();

      // Mark messages sent to us as read (user opened the chat)
      await messagesCollection.updateMany(
        {
          taskId,
          receiverId: callerId,
          isRead: false,
        },
        { $set: { isRead: true } }
      );

      // Return oldest-first for the UI
      const formatted = messages.reverse().map((m) => ({
        id: m._id.toString(),
        taskId: m.taskId,
        senderId: m.senderId,
        receiverId: m.receiverId,
        content: m.content,
        isRead: m.isRead,
        createdAt: m.createdAt instanceof Date
          ? m.createdAt.toISOString()
          : m.createdAt,
      }));

      return res.status(200).json(formatted);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error: any) {
    console.error('Messages API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}