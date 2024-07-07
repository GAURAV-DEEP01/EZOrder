import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { createWS } from "./routes/websocket";
import dbUtil from "./database/dbUtils";
import db from "./database/db";

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Ensure MongoDB connection is established
db.connectMongoDb(process.env.MONGODB_URL as string).then(() => {
  createWS(server, {
    path: "/listen/kitchen",
    cors: {
      origin: "*"
    }
  }, dbUtil.getAllOrders);

  createWS(server, {
    path: "/listen/curntOrder",
    cors: {
      origin: "*"
    }
  }, dbUtil.getCurrentOrder);
}).catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
});
