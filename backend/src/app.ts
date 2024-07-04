import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { db } from "./database/db";
import cors from "cors";
//route
import itemRouter from "./routes/ItemRoute";
import orderRouter from "./routes/orderRoute";

db.connectMongoDb(process.env.MONGODB_URL as string);

app.use(
  cors({
    //origin set to any for testing
    origin: "*",
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(201).send("<h1>BE init Setup");
});

app.use("/items", itemRouter);

app.use("/orders", orderRouter);

export default app;
