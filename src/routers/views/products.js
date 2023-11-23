import { Router } from "express";
import * as service from "../../services/product.services.js";

const productsRouter = Router();

//realtimeproducts
productsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtime", { title: "Hutt Commerce" });
  } catch (error) {
    res.status(500).json({ success: false, response: error });
  }
});
//products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await service.getAll();
    const toRender = [...products];
    //separo el primer producto para el destacado
    res.render("products", {
      title: "Hutt Commerce",
      active: toRender[0],
      products: toRender.slice(1, toRender.length - 1),
    });
  } catch (error) {
    next(error);
  }
});

//product id
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await service.getById(req.params.id);
    //separo el primer producto para el destacado
    res.render("product", {
      title: "Hutt Commerce",
      product: product,
    });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
