import { Server } from "socket.io";
import http from "http";
import Orders from "../models/orderModel";

export function createWS(server: http.Server, options: any, fetchData: () => Promise<any>) {
  const io = new Server(server, options);

  io.on("connection", async (socket) => {
    console.log("a user connected");
    socket.emit("update", await fetchData());
    const changeStream = Orders.watch();
    changeStream.on("change", (data) => {
      try {
        fetchData().then((result) => {
          socket.emit("update", result);
        })
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
    socket.on("disconnect", () => {
      console.log("a user disconnected");
      changeStream.close();
    });
  });
}
