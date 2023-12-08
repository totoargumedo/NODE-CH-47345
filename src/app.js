import express from "express";
import indexRouter from "./routers/index.js";
import handlebars from "express-handlebars";
import "dotenv/config";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import * as service from "./services/product.services.js";
import * as serviceMessages from "./services/messages.service.js";
import { initMongo } from "./daos/mongodb/connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

//server

const app = express();

//options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//estaticos
app.use(express.static(__dirname + "/public"));

//views engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routers
app.use("/", indexRouter);

//middlewares
app.use(errorHandler);
app.use(notFoundHandler);

//inicializacion server
const persistance = "MONGO";

const httpServer = app.listen(process.env.PORT, async () => {
  if (persistance === "MONGO") await initMongo();
  console.log(`Server runnning on port ${process.env.PORT}`);
});

//socket
const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("🟢 ¡New connection! client: " + socket.id);

  socketServer.emit("products", await service.getAll());
  socketServer.emit("messages", await serviceMessages.getAll());

  socket.on("disconnect", () =>
    console.log("🔴 ¡User disconnect! client: " + socket.id)
  );

  socket.on("newProduct", async () => {
    socket.emit("products", await service.getAll());
  });

  socket.on("newMessage", async (data) => {
    await serviceMessages.create(data);
    socket.emit("messages", await serviceMessages.getAll());
  });
});
