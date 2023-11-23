import express from "express";
import indexRouter from "./routers/index.js";
import handlebars from "express-handlebars";
import "dotenv/config";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import * as service from "./services/product.services.js";
import { initMongo } from "./daos/mongodb/connection.js";

//server

const app = express();

//confige the response is sent to the client but it is not happening and instead it is running and hence also triggering any other response. So what you need to do is to add return before any res.status or res.json line.
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

  socket.on("disconnect", () =>
    console.log("🔴 ¡User disconnect! client: " + socket.id)
  );

  socket.on("newProduct", async () => {
    socket.emit("products", await service.getAll());
  });
});
