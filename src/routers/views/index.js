import { Router } from "express";
import productsRouter from "./products.js";
import * as service from "../../services/product.services.js";
import cartsRouter from "./carts.js";
import messagesRouter from "./messages.js";

const viewsRouter = Router();

//vistas
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/cart", cartsRouter);
viewsRouter.use("/chat", messagesRouter);
//index page
viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await service.getAll(1, 5);
    const toRender = [...products.docs];
    //coloco una propiedad temporal al primer producto para el atributo "active" en el carrousel
    toRender[0].activeImage = true;
    res.render("index", { title: "Hutt Commerce", products: toRender });
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
