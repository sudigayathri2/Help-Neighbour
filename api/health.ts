import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../lib/db.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const { db } = await connectToDatabase();
    // Simple ping to verify connection
    await db.command({ ping: 1 });
    return res.status(200).json({ status: 'connected', database: 'HelpNeighbor' });
  } catch (error: any) {
    console.error("Health Check Failed:", error.message);
    const isConfigMissing = !process.env.MONGODB_URI;
    return res.status(503).json({ 
      status: 'error', 
      message: isConfigMissing ? 'MONGODB_URI environment variable is missing' : error.message,
      isConfigMissing
    });
  }
}