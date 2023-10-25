import ProductManager from "../managers/productManager.js";

export const productos = new ProductManager(
  "./src/db/lightsabers.json",
  "lightsabers"
);
