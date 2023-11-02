import { Server } from "socket.io";
import { httpServer } from "../app.js";

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Cliente socket conectado id: " + socket.id);
});
