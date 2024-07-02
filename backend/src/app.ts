import dotenv from "dotenv"
dotenv.config();
import express from 'express';
const app = express();
import { db } from "./config/db";

db.connectMongoDb(process.env.MONGODB_URL as string);

app.use(express.json());

// Routes
app.get('/',(req ,res)=>{
    res.status(201).send("<h1>BE init Setup");
})


export default app;
