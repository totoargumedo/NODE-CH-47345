import express from "express";
import { productos } from "./controllers/products.js";

//server

const app = express();
const PORT = 8080;

//config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints

app.get("/", (req, res) => {
  res.send(
    `<div style="height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;">
    <h1>WELCOME STRANGER</h1>
    <h2>este es un div centrado</h2>
    <h3>&#128517;</h3>
    </div>`
  );
});

//endpoints productos

app.get("/products", (req, res) => {
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

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const one = productos.getProductById(id);
  res.status(200).json({ success: true, response: one });
});

//inicializacion server

const httpServer = app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
