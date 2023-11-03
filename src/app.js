import express from "express";
import indexRouter from "./routers/index.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";

//server

const app = express();
const PORT = 8080;

//config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//estaticos
app.use(express.static(__dirname + "public"));

//views engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routers
app.use("/", indexRouter);

//inicializacion server

export const httpServer = app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
