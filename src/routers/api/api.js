import { Router } from "express";
import productsRouter from "./products.js";
import cartsRouter from "./carts.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);

export default apiRouter;
