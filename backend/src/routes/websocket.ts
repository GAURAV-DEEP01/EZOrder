import { Server } from "socket.io";
import http from "http";
import Orders from "../models/orderModel";

export function createWS(
  server: http.Server,
  options: any,
  fetchData: () => Promise<any>
) {
  const io = new Server(server, options);

  io.on("connection", (socket) => {
    console.log(
      "A user connected to socket " + options.path + " with id : " + socket.id
    );

    // await not needed in this case
    fetchData()
      .then((data) => socket.emit("update", data))
      .catch((e) => console.error("Fetch failed " + e));

    const changeStream = Orders.watch();
    changeStream.on("change", async () => {
      try {
        const data = await fetchData();
        socket.emit("update", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      changeStream.close();
    });
  });
}
