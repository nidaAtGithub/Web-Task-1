import mongoose from "mongoose";

// Global variable to cache connection in development
let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("=> Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to database");
  }
}