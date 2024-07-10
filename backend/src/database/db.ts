import mongoose from "mongoose";
import { createWS } from "../routes/websocket";
import { server } from "../server";
import dbUtil from "./dbUtils";

const connectMongoDb = async (mongodbUrl: string): Promise<void> => {
  try {
    await mongoose.connect(mongodbUrl);
    console.info("MongoDB Connected...");
  } catch (e) {
    console.error("Error connecting to MongoDB", e);
  }
};

const wsInitializer = () => {
  createWS(
    server,
    {
      path: "/listen/kitchen",
      cors: {
        origin: "*",
      },
    },
    dbUtil.getAllOrders
  );

  createWS(
    server,
    {
      path: "/listen/curntOrder",
      cors: {
        origin: "*",
      },
    },
    dbUtil.getCurrentOrder
  );
};
const db = { connectMongoDb, wsInitializer };
export default db;
