import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { startWS } from "./routes/websocket";

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

startWS(server, {
  path: "/kitchen/listen",
  cors: {
    origin: "*"
  }
})