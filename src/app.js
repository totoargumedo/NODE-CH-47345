import express from "express";
import indexRouter from "./routers/index.js";
import { __dirname } from "./utils.js";

//server

const app = express();
const PORT = 8080;

//config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//estaticos
app.use(express.static(__dirname + "public"));

//routers
app.use("/", indexRouter);

//inicializacion server

const httpServer = app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
console.log(__dirname);
