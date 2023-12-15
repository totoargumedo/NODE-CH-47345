import { Router } from "express";
import productsRouter from "./products.js";
import cartsRouter from "./carts.js";
import usersRouter from "./users.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/users", usersRouter);

export default apiRouter;
