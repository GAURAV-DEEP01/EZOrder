import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import db from "./database/db";
import cors from "cors";
//route
import itemRouter from "./routes/ItemRoute";
import orderRouter from "./routes/orderRoute";

// Connecting mongodb and then creating a websocket
db.connectMongoDb(process.env.MONGODB_URL as string)
  .then(() => db.wsInitializer())
  .catch((e) => console.error("Failed to connect to MongoDB:", e));

app.use(
  cors({
    //origin set to any for testing
    origin: "*",
  })
);

app.use(express.json());

// Routes

app.use("/items", itemRouter);

app.use("/orders", orderRouter);

app.all("*", (req, res) => {
  res.status(404).send({ success: false, msg: "Invalid route" });
});

export default app;
