import { Router } from "express";
import apiRouter from "./api/api.js";

const indexRouter = Router();

//routers
indexRouter.use("/api", apiRouter);

//endpoints raiz

indexRouter.get("/", (req, res) => {
  res.send(
    `<div style="height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;">
    <h1>WELCOME STRANGER</h1>
    <h2>este es un div centrado</h2>
    <h3>&#128517;</h3>
    </div>`
  );
});

export default indexRouter;
