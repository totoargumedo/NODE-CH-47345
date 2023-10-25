import { Router } from "express";
import { productos } from "../../controllers/products.js";

const products_router = Router();

//endpoints productos

products_router.get("/", (req, res) => {
  //limite y productos
  const limit = req.query.limit;
  const all = productos.getProducts();
  //revisamos si hay error en los productos
  if (!all) {
    return res.status(404).json({ success: false, response: "Something malo" });
  }
  //revisamos si hay limite
  if (limit) {
    //devolvemos la porcion de productos solicitada
    return res
      .status(200)
      .json({ success: true, response: all.slice(0, limit) });
  }
  //devolvemos todos si no hay limite
  res.status(200).json({ success: true, response: all });
});

products_router.get("/:id", (req, res) => {
  const id = req.params.id;
  const one = productos.getProductById(id);
  res.status(200).json({ success: true, response: one });
});

export default products_router;
