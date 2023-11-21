import { Router } from "express";
import { productos } from "../../db/products.js";
import productsRouter from "./products.js";

const viewsRouter = Router();

//vistas
viewsRouter.use("/products", productsRouter);
//index page
viewsRouter.get("/", async (req, res) => {
  try {
    const products = await productos.getProducts(5);
    //coloco una propiedad temporal al primer producto para el atributo "active" en el carrousel
    products[0].activeImage = true;
    res.render("index", { title: "Hutt Commerce", products: products });
  } catch (error) {
    res.status(500).json({ success: false, response: error });
  }
});

export default viewsRouter;
