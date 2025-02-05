import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure this is set in Vercel environment variables
const dbName = "myDatabase"; // Replace with your database name

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside Vercel settings.");
}

let client: MongoClient;
let db: Db;

export const connectToDatabase = async () => {
  if (db) {
    console.log("Using existing database connection."); // Prevents unnecessary reconnections
    return db;
  }

  try {
    console.log("Connecting to MongoDB...");
    client = new MongoClient(uri, {
      // Optional: Optimize performance
      maxPoolSize: 10, // Set connection pool size
      serverSelectionTimeoutMS: 5000, // Prevents infinite connection wait
    });

    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB!");

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to database");
  }
};
