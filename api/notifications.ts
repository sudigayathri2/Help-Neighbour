import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { db } = await connectToDatabase();
    const notesCollection = db.collection('notifications');

    if (req.method === 'GET') {
      const notifications = await notesCollection.find({}).sort({ timestamp: -1 }).limit(10).toArray();
      return res.status(200).json(notifications);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (id) {
          await notesCollection.deleteOne({ id });
      } else {
          await notesCollection.deleteMany({});
      }
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('API Notifications Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}