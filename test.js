import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb://user43:user43@ac-euozzhg-shard-00-00.itamchr.mongodb.net:27017,ac-euozzhg-shard-00-01.itamchr.mongodb.net:27017,ac-euozzhg-shard-00-02.itamchr.mongodb.net:27017/?replicaSet=atlas-14nivq-shard-0&ssl=true&authSource=admin";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected successfully!");
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    await client.close();
  }
}

run();