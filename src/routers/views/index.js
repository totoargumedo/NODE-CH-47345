import { Router } from "express";
import productsRouter from "./products.js";
import * as service from "../../services/product.services.js";

const viewsRouter = Router();

//vistas
viewsRouter.use("/products", productsRouter);
//index page
viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await service.getAll(5);
    const toRender = [...products];
    //coloco una propiedad temporal al primer producto para el atributo "active" en el carrousel
    toRender[0].activeImage = true;
    res.render("index", { title: "Hutt Commerce", products: toRender });
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
