
// import { VercelRequest, VercelResponse } from '@vercel/node';
// import { connectToDatabase } from '../lib/db';
// import { MOCK_HELPERS } from '../../constants';

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   res.setHeader('Content-Type', 'application/json');

//   try {
//     const { db } = await connectToDatabase();
//     const usersCollection = db.collection('users');
//     const { action, email, password, name } = req.body;

//     if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

//     if (action === 'demo') {
//       const demoEmail = 'demo@helpneighbor.com';

//       // Upsert Demo User
//       await usersCollection.updateOne(
//         { email: demoEmail },
//         { 
//           $setOnInsert: {
//             id: `u-demo`,
//             name: 'Demo Neighbor',
//             email: demoEmail,
//             password: 'demo-access-only',
//             avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Demo`,
//             isAvailable: true,
//             walletBalance: 250.00,
//             rating: 4.9,
//             totalHelps: 5,
//             statusMessage: "Just exploring the neighborhood! Happy to help."
//           }
//         },
//         { upsert: true }
//       );

//       // Crucial: Seed Mock Neighbors so transactions don't fail in simulation
//       for (const helper of MOCK_HELPERS) {
//         await usersCollection.updateOne(
//           { id: helper.id },
//           { $setOnInsert: { ...helper, walletBalance: 100.00 } },
//           { upsert: true }
//         );
//       }

//       const user = await usersCollection.findOne({ email: demoEmail });
//       const { password: _, ...userWithoutPass } = user as any;
//       return res.status(200).json(userWithoutPass);
//     }

//     if (action === 'signup') {
//       if (!email || !password || !name) {
//         return res.status(400).json({ error: 'Name, email and password are required' });
//       }

//       const existing = await usersCollection.findOne({ email });
//       if (existing) return res.status(400).json({ error: 'User already exists' });

//       const newUser = {
//         id: `u-${Date.now()}`,
//         name,
//         email,
//         password,
//         avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
//         isAvailable: false,
//         walletBalance: 50.00,
//         rating: 5.0,
//         totalHelps: 0,
//         statusMessage: "New neighbor here!"
//       };

//       await usersCollection.insertOne(newUser as any);
//       const { password: _, ...userWithoutPass } = newUser;
//       return res.status(201).json(userWithoutPass);
//     }

//     if (action === 'login') {
//       const user = await usersCollection.findOne({ email, password });
//       if (!user) return res.status(401).json({ error: 'Invalid credentials' });

//       const { password: _, ...userWithoutPass } = user;
//       return res.status(200).json(userWithoutPass);
//     }

//     return res.status(400).json({ error: 'Invalid action' });
//   } catch (error: any) {
//     console.error("Auth API Error:", error.message);
//     const status = error.message.includes('MONGODB_URI') ? 503 : 500;
//     return res.status(status).json({ 
//       error: error.message || 'Authentication service error',
//       isDbError: error.message.includes('MONGODB_URI')
//     });
//   }
// }

//-------------

// import  type { VercelRequest, VercelResponse } from '@vercel/node';
// import bcrypt from 'bcryptjs';
// import { connectToDatabase } from '../lib/db';
// import { MOCK_HELPERS } from '../src/shared/constants.tsx';

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   res.setHeader('Content-Type', 'application/json');

//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { db } = await connectToDatabase();
//     const usersCollection = db.collection('users');
//     const { action, email, password, name } = req.body;

//     // ===============================
//     // DEMO LOGIN
//     // ===============================
//     if (action === 'demo') {
//       const demoEmail = 'demo@helpneighbor.com';

//       const existingDemo = await usersCollection.findOne({ email: demoEmail });

//       if (!existingDemo) {
//         const hashedPassword = await bcrypt.hash('demo-access-only', 10);

//         await usersCollection.insertOne({
//           id: 'u-demo',
//           name: 'Demo Neighbor',
//           email: demoEmail,
//           password: hashedPassword,
//           avatar: `https://api.dicebear.com/9.x/big-ears/svg?seed=Felix`,
//           isAvailable: true,
//           walletBalance: 250.0,
//           rating: 4.9,
//           totalHelps: 5,
//           statusMessage: "Just exploring the neighborhood! Happy to help."
//         });

//         // Seed mock helpers
//         for (const helper of MOCK_HELPERS) {
//           await usersCollection.updateOne(
//             { id: helper.id },
//             { $setOnInsert: { ...helper, walletBalance: 100.0 } },
//             { upsert: true }
//           );
//         }
//       }

//       const user = await usersCollection.findOne({ email: demoEmail });
//       if (!user) return res.status(500).json({ error: 'Demo user error' });

//       const { password: _, ...userWithoutPass } = user as any;
//       return res.status(200).json(userWithoutPass);
//     }

//     // ===============================
//     // SIGNUP
//     // ===============================
//     if (action === 'signup') {
//       if (!email || !password || !name) {
//         return res.status(400).json({
//           error: 'Name, email and password are required'
//         });
//       }

//       const existingUser = await usersCollection.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: 'User already exists' });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = {
//         id: `u-${Date.now()}`,
//         name,
//         email,
//         password: hashedPassword,
//         avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
//         isAvailable: false,
//         walletBalance: 50.0,
//         rating: 5.0,
//         totalHelps: 0,
//         statusMessage: 'New neighbor here!',
//         createdAt: new Date()
//       };

//       await usersCollection.insertOne(newUser as any);

//       const { password: _, ...userWithoutPass } = newUser;
//       return res.status(201).json(userWithoutPass);
//     }

//     // ===============================
//     // LOGIN
//     // ===============================
//     if (action === 'login') {
//       if (!email || !password) {
//         return res.status(400).json({
//           error: 'Email and password are required'
//         });
//       }

//       const user = await usersCollection.findOne({ email });
//       if (!user) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }

//       const validPassword = await bcrypt.compare(password, user.password);
//       if (!validPassword) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }

//       const { password: _, ...userWithoutPass } = user;
//       return res.status(200).json(userWithoutPass);
//     }

//     return res.status(400).json({ error: 'Invalid action' });

//   } catch (error: any) {
//     console.error('Auth API Error:', error);

//     const isDbError =
//       error.message?.includes('MONGODB_URI') ||
//       error.message?.includes('Mongo');

//     return res.status(isDbError ? 503 : 500).json({
//       error: error.message || 'Authentication service error',
//       isDbError
//     });
//   }
// }


//----------

// /api/auth.tsimport type { VercelRequest, VercelResponse } from '@vercel/node';import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../lib/db.js';
import { MOCK_HELPERS } from '../src/shared/constants.js';
import type { User } from '../src/shared/types.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>('users');
    const { action, email, password, name } = req.body;
    // DEMO LOGIN
    if (action === 'demo') {
      const demoEmail = 'demo@helpneighbor.com';
      let demoUser = await usersCollection.findOne({ email: demoEmail }) as User | null;

      if (!demoUser) {
        const hashedPassword = await bcrypt.hash('demo-access-only', 10);
        const newDemoUser: User = {
          _id: undefined,              
          id: 'u-demo',
          name: 'Demo Neighbor',
          email: demoEmail,
          password: hashedPassword,
          avatar: `https://api.dicebear.com/9.x/big-ears/svg?seed=Felix`,
          isAvailable: true,
          walletBalance: 250,
          rating: 4.9,
          totalHelps: 5,
          statusMessage: "Just exploring the neighborhood! Happy to help.",
          createdAt: new Date(),
        };

        const insertResult = await usersCollection.insertOne(newDemoUser);
        newDemoUser._id = insertResult.insertedId.toString(); // ensure _id exists

        demoUser = newDemoUser;

        // Seed mock helpers for demo
        for (const helper of MOCK_HELPERS) {
          await usersCollection.updateOne(
            { id: helper.id },
            { $setOnInsert: { ...helper, walletBalance: 100 } },
            { upsert: true }
          );
        }
      }

      const { password: _, ...userWithoutPass } = demoUser;
      return res.status(200).json(userWithoutPass);
    }

    
    // SIGNUP
    if (action === 'signup') {
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email and password are required' });
      }

      const existingUser = await usersCollection.findOne({ email }) as User | null;
      if (existingUser) return res.status(400).json({ error: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: User = {
        _id: undefined,
        id: `u-${Date.now()}`,
        name,
        email,
        password: hashedPassword,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        isAvailable: false,
        walletBalance: 50,
        rating: 5,
        totalHelps: 0,
        statusMessage: 'New neighbor here!',
        createdAt: new Date(),
      };

      const insertResult = await usersCollection.insertOne(newUser);
      newUser._id = insertResult.insertedId.toString();

      const { password: __, ...userWithoutPass } = newUser;
      return res.status(201).json(userWithoutPass);
    }

    
    // LOGIN
    if (action === 'login') {
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await usersCollection.findOne({ email }) as User | null;
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      if (!user.password) {
        return res.status(500).json({ error: 'User password is missing.' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

      const { password: ___, ...userWithoutPass } = user;
      return res.status(200).json(userWithoutPass);
    }

    return res.status(400).json({ error: 'Invalid action' });

  } catch (error: any) {
    console.error('Auth API Error:', error);

    const isDbError = error.message?.includes('MONGODB_URI') || error.message?.includes('Mongo');

    return res.status(isDbError ? 503 : 500).json({
      error: error.message || 'Authentication service error',
      isDbError,
    });
  }
}