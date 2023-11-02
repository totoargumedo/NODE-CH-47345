import { Router } from "express";
import { productos } from "../../db/products.js";

const productsRouter = Router();

//realtimeproducts
productsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productos.getProducts().reverse();
    res.render("realtime", { title: "Hutt Commerce", products: products });
  } catch (error) {
    res.status(500).json({ success: false, response: error });
  }
});
//products
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productos.getProducts();
    //separo el primer producto para el destacado
    res.render("products", {
      title: "Hutt Commerce",
      active: products[0],
      products: products.slice(1, products.length - 1),
    });
  } catch (error) {
    res.status(500).json({ success: false, response: error });
  }
});

//product id
productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await productos.getProductById(req.params.id);
    //separo el primer producto para el destacado
    res.render("product", {
      title: "Hutt Commerce",
      product: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, response: error });
  }
});

export default productsRouter;
