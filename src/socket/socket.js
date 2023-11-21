import { Server } from "socket.io";
import { socketServer } from "../app.js";
import { productos } from "../db/products.js";

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("🟢 ¡New connection! client: " + socket.id);

  socketServer.emit("products", await productos.getProducts());

  socket.on("disconnect", () =>
    console.log("🔴 ¡User disconnect! client: " + socket.id)
  );
});
