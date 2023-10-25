import express from "express";
import index_router from "./routers/index.js";

//server

const app = express();
const PORT = 8080;

//config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/", index_router);

//inicializacion server

const httpServer = app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
