//librerias
import express from "express";
import handlebars from "express-handlebars";
import "dotenv/config";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

//routers
import indexRouter from "./routers/index.js";

//utils
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import "./daos/mongodb/connection.js";

//servicios
import * as service from "./services/product.services.js";
import * as serviceMessages from "./services/messages.service.js";

//middlewares
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

//server
const app = express();
const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.DB_CONNECTION,
    ttl: 600,
    crypto: { secret: process.env.COOKIE_KEY },
  }),
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 },
};

//options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(session(mongoStoreOptions));

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
const httpServer = app.listen(process.env.PORT, async () => {
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
