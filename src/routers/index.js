import { Router } from "express";
import apiRouter from "./api/api.js";
import viewsRouter from "./views/index.js";

const indexRouter = Router();

//routers
indexRouter.use("/api", apiRouter);
indexRouter.use("/", viewsRouter);

//views

export default indexRouter;
