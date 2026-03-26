// import { MongoClient, Db } from 'mongodb';

// const uri = process.env.MONGODB_URI || "";
// const options = {
//   maxPoolSize: 5,
//   serverSelectionTimeoutMS: 2000, // Fail even faster (2s)
//   connectTimeoutMS: 2000,
//   socketTimeoutMS: 10000,
// };

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
//   if (!uri) {
//     throw new Error('MONGODB_URI environment variable is missing.');
//   }

//   try {
//     if (!clientPromise) {
//       client = new MongoClient(uri, options);
//       clientPromise = client.connect();
//     }
//     const clientInstance = await clientPromise;
//     const db = clientInstance.db("helpneighboure");
//     return { client: clientInstance, db };
//   } catch (e: any) {
//     console.error("Database connection failed:", e.message);
//     clientPromise = null as any; 
//     throw e;
//   }
// // }
// import { MongoClient, Db } from 'mongodb';

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error('MONGODB_URI environment variable is missing.');
// }

// const options = {
//   maxPoolSize: 5,
//   serverSelectionTimeoutMS: 5000,
//   connectTimeoutMS: 5000,
// };

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// // Use global cache in development & serverless
// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri, options);
//   global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
//   const clientInstance = await clientPromise;
//   const db = clientInstance.db('helpneighbor');
//   return { client: clientInstance, db };
// }

// import { MongoClient, Db } from 'mongodb';

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   console.error("❌ MONGODB_URI is missing.");
//   throw new Error('MONGODB_URI environment variable is missing.');
// }

// const options = {
//   maxPoolSize: 5,
//   serverSelectionTimeoutMS: 5000,
//   connectTimeoutMS: 5000,
// };

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// // Use global cache in development & serverless
// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// if (!global._mongoClientPromise) {
//   console.log("🔄 Creating new MongoDB connection...");

//   client = new MongoClient(uri, options);

//   global._mongoClientPromise = client.connect()
//     .then((connectedClient) => {
//       console.log("✅ MongoDB connected successfully.");
//       return connectedClient;
//     })
//     .catch((err) => {
//       console.error("❌ MongoDB connection failed:", err.message);
//       throw err;
//     });
// } else {
//   console.log("♻️ Reusing existing MongoDB connection.");
// }

// clientPromise = global._mongoClientPromise;

// export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
//   try {
//     const clientInstance = await clientPromise;
//     const db = clientInstance.db('helpneighbor');
//     console.log("📦 Using database: helpneighbor");
//     return { client: clientInstance, db };
//   } catch (error: any) {
//     console.error("❌ Error in connectToDatabase:", error.message);
//     throw error;
//   }
// }
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('❌ MONGODB_URI environment variable is missing.');

const options = {
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const isDev = process.env.NODE_ENV === 'development';

if (!global._mongoClientPromise) {
  if (isDev) console.log('🔄 Creating new MongoDB connection...');
  client = new MongoClient(uri, options);

  global._mongoClientPromise = client.connect().then((connectedClient) => {
    if (isDev) console.log('✅ MongoDB connected successfully.');
    return connectedClient;
  }).catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    throw err;
  });
} else {
  if (isDev) console.log('♻️ Reusing existing MongoDB connection.');
}

clientPromise = global._mongoClientPromise;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const clientInstance = await clientPromise;
  const db = clientInstance.db('helpneighbor');
  return { client: clientInstance, db };
}