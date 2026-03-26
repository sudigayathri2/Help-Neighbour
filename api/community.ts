import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { db } = await connectToDatabase();
    const communityCollection = db.collection('community');

    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // -------------------
    // GET COMMUNITY DATA
    // -------------------
    if (req.method === 'GET') {
      const posts = await communityCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json({ posts });
    }

    // -------------------
    // CREATE COMMUNITY POST
    // -------------------
    if (req.method === 'POST') {
      const { title, content } = req.body;

      const newPost = {
        id: `c-${Date.now()}`,
        userId,
        title,
        content,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await communityCollection.insertOne(newPost);

      return res.status(201).json(newPost);
    }

    // -------------------
    // UPDATE COMMUNITY POST
    // -------------------
    if (req.method === 'PATCH') {
      const { id, title, content } = req.body;

      const updateData: any = { updatedAt: Date.now() };
      if (title) updateData.title = title;
      if (content) updateData.content = content;

      await communityCollection.updateOne(
        { id, userId }, // only author can update
        { $set: updateData }
      );

      const updated = await communityCollection.findOne({ id });

      return res.status(200).json(updated);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error: any) {
    console.error('Community API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}