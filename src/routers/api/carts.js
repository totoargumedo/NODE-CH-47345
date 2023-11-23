import { Router } from "express";
import * as controller from "../../controllers/cart.controller.js";

const cartsRouter = Router();

//endpoints carritos
cartsRouter.post("/", controller.create);

cartsRouter.get("/", controller.getAll);

cartsRouter.get("/:cid", controller.getById);

cartsRouter.post("/:cid/product/:pid", controller.addProductById);

cartsRouter.delete("/:cid/product/:pid", controller.removeProductById);

cartsRouter.delete("/:cid", controller.remove);

export default cartsRouter;
