import express from "express";
import indexRouter from "./routers/index.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { productos } from "./db/products.js";

//server

const app = express();
const PORT = 8080;

//config
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

const httpServer = app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

//socket
const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("🟢 ¡New connection! client: " + socket.id);

  socketServer.emit("products", await productos.getProducts());

  socket.on("disconnect", () =>
    console.log("🔴 ¡User disconnect! client: " + socket.id)
  );

  socket.on("newProduct", async () => {
    socket.emit("products", await productos.getProducts());
  });
});
