
// import type { VercelRequest, VercelResponse } from '@vercel/node';
// import { connectToDatabase } from '../lib/db';

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   try {
//     const { db } = await connectToDatabase();
//     const usersCollection = db.collection('users');
//     const userId = req.headers['x-user-id'] as string;
//     const { id: targetId } = req.query;

//     if (!userId) return res.status(401).json({ error: 'Unauthorized' });

//     if (req.method === 'GET') {
//       // If a specific target ID is requested
//       if (targetId) {
//         const user = await usersCollection.findOne({ id: targetId });
//         if (!user) return res.status(404).json({ error: 'User not found' });
        
//         // Remove sensitive fields for public viewing
//         const { password, email, ...publicUser } = user as any;
//         return res.status(200).json({ user: publicUser });
//       }

//       // Default GET: Return current user and available list
//       const currentUser = await usersCollection.findOne({ id: userId });
//       if (!currentUser) return res.status(404).json({ error: 'User not found' });

//       const availableHelpers = await usersCollection.find({ 
//         isAvailable: true, 
//         id: { $ne: userId } 
//       }).toArray();
      
//       return res.status(200).json({ currentUser, availableHelpers });
//     }

//     if (req.method === 'PATCH') {
//       const { isAvailable, statusMessage } = req.body;
//       const updateData: any = {};
//       if (typeof isAvailable !== 'undefined') updateData.isAvailable = isAvailable;
//       if (typeof statusMessage !== 'undefined') updateData.statusMessage = statusMessage;

//       await usersCollection.updateOne({ id: userId }, { $set: updateData });
//       const updatedUser = await usersCollection.findOne({ id: userId });
//       return res.status(200).json(updatedUser);
//     }

//     return res.status(405).json({ error: 'Method not allowed' });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// }


import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../lib/db.js';
import type { User } from '../src/shared/types.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>('users');
    const userId = req.headers['x-user-id'] as string;
    // const { id: targetId, available } = req.query;
    const { id: targetId } = req.query;

    // -------------------
    // AUTH CHECK
    // -------------------
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // -------------------
    // GET METHOD
    // -------------------
    if (req.method === 'GET') {
      // 1️⃣ Specific user requested
      if (targetId) {
        const user = await usersCollection.findOne({ id: targetId as string });
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { password, email, ...publicUser } = user as any;
        return res.status(200).json({ user: publicUser });
      }

      const query = {
        isAvailable: true,
        id: { $ne: userId }
      };

      const users = await usersCollection.find(query).toArray();

      // Remove sensitive fields
      const publicUsers = users.map(({ password, email, ...rest }) => rest);

      // Also return current user
      const currentUser = await usersCollection.findOne({ id: userId });
      if (!currentUser) return res.status(404).json({ error: 'User not found' });
      const { password: _, ...publicCurrentUser } = currentUser as any;

      return res.status(200).json({ currentUser: publicCurrentUser, availableHelpers: publicUsers });
    }

    // -------------------
    // PATCH METHOD
    // -------------------
    if (req.method === 'PATCH') {
      const { isAvailable, statusMessage, description, specialties } = req.body;
      const updateData: Partial<User> = {};

      if (typeof isAvailable !== 'undefined') updateData.isAvailable = isAvailable;
      if (typeof statusMessage !== 'undefined') updateData.statusMessage = statusMessage;
      if (typeof description !== 'undefined') {updateData.description = description;}
      if (Array.isArray(specialties)) {updateData.specialties = specialties;}

      await usersCollection.updateOne({ id: userId }, { $set: updateData });
      const updatedUser = await usersCollection.findOne({ id: userId });
      const { password, email, ...publicUser } = updatedUser as any;
      return res.status(200).json(publicUser);
    }

    // -------------------
    // METHOD NOT ALLOWED
    // -------------------
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error: any) {
    console.error('Users API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}