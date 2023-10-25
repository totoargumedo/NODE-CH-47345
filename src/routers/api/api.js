import { Router } from "express";
import products_router from "./products.js";

const api_router = Router();

api_router.use("/products", products_router);

export default api_router;
