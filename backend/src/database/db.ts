import mongoose from "mongoose";

const connectMongoDb = async (mongodbUrl: string) => {
  try {
    await mongoose.connect(mongodbUrl);
    console.info("MongoDB Connected...");
  } catch (e) {
    console.error("Error connecting to MongoDB", e);
  }
};

const db = { connectMongoDb };
export default db;
