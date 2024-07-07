import { Server } from "socket.io";
import http, { ServerOptions } from "http";
import Orders from "../models/orderModel";
import dbUtil from '../database/dbUtils';
export function startWS(server: http.Server, option: any) {
  let io = new Server(server, option);

  io.on("connection", (socket) => {
    console.log("a user connected");
    Orders.watch().on("change", async (data) => {
      io.emit("update", await dbUtil.getAllOrders());
    })
  });
  io.on("disconnect", (socket) => {
    console.log("a user disconnected");
  });

}