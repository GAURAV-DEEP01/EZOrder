import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { db } from "./database/db";
//route
import itemRouter from "./routs/ItemRout";
import orderRouter from "./routs/orderRout";

db.connectMongoDb(process.env.MONGODB_URL as string);

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(201).send("<h1>BE init Setup");
});

app.use("/items", itemRouter);

app.use("/orders", orderRouter);

export default app;
