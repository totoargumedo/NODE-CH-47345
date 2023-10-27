import { Router } from "express";
import { productos } from "../../controllers/products.js";

const products_router = Router();

//endpoints productos

products_router.get("/", (req, res) => {
  //limite y productos
  const limit = req.query.limit;
  const all_products = productos.getProducts();
  //revisamos si hay error en los productos
  if (!all_products) {
    return res
      .status(404)
      .json({ success: false, response: "Something malo happend" });
  }
  //revisamos si hay limite
  if (limit) {
    //devolvemos la porcion de productos solicitada
    return res
      .status(200)
      .json({ success: true, response: all_products.slice(0, limit) });
  }
  //devolvemos todos si no hay limite
  res.status(200).json({ success: true, response: all_products });
});

products_router.get("/:id", (req, res) => {
  const id = req.params.id;
  const one_product = productos.getProductById(id);
  res.status(200).json({ success: true, response: one_product });
});

products_router.post("/", async (req, res) => {
  try {
    //extraemos los datos desde el body y le damos valores default de ser necesario
    let {
      title,
      description,
      price,
      code,
      category,
      stock,
      status,
      thumbnails,
    } = req.body || null;
    //chequeamos que venga status y thumbnails, sino le asignamos valor por defecto
    if (status === null || status === undefined) {
      status = true;
    }
    if (thumbnails === null || thumbnails === undefined) {
      thumbnails = [];
    }

    //si falta algun valor obligatorio, devolvemos error
    if (!title || !description || !price || !code || !category || !stock) {
      return res
        .status(400)
        .json({ success: false, response: "Missing required fields" });
    }

    //armamos el objeto producto
    const product = {
      title,
      description,
      code,
      price: parseFloat(price),
      status,
      stock: parseInt(stock),
      category,
      thumbnails,
    };

    //guardamos
    const new_product = await productos.addProduct(product);
    //Si la respuesta del manager no es un objeto, devuelve el mensaje de error
    if (typeof new_product != "object") {
      return res.status(400).json({ success: false, response: new_product });
    }

    return res.status(201).json({ success: true, response: new_product });
  } catch (error) {
    return res.status(500).json({ success: false, response: error });
  }
});

products_router.put("/:id", async (req, res) => {
  try {
    //Nos aseguramos que venga informacion para actualizar
    const data = req.body;
    const { id } = req.params;

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, response: "Nothing to update" });
    }

    const product = await productos.updateProduct(id, data);

    //Si la respuesta del manager no es un objeto, devuelve el mensaje de error
    if (typeof product != "object") {
      return res.status(400).json({ success: false, response: product });
    }

    return res.status(200).json({ success: true, response: product });
  } catch (error) {
    return res.status(500).json({ success: false, response: error });
  }
});

products_router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productos.deleteProduct(id);

    //Si la respuesta del manager no es un objeto, devuelve el mensaje de error
    if (product != "Product deleted") {
      return res.status(400).json({ success: false, response: product });
    }

    return res.status(200).json({ success: true, response: product });
  } catch (error) {
    return res.status(500).json({ success: false, response: error });
  }
});

export default products_router;
