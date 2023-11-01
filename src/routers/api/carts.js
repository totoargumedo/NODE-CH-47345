import { Router } from "express";
import { carritos } from "../../db/carts.js";

const cartsRouter = Router();

//endpoints productos
cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await carritos.createCart();
    res.status(201).json({ success: true, response: cart });
  } catch (error) {
    return res.status(500).json({ success: false, response: error });
  }
});

cartsRouter.get("/", (req, res) => {
  const cart = carritos.getCarts();
  return res.status(200).json({ success: true, response: cart });
});

cartsRouter.get("/:cid", (req, res) => {
  const { cid } = req.params;
  const cart = carritos.getCartById(cid);
  if (typeof cart != "object") {
    return res.status(400).json({ success: false, response: cart });
  }
  return res.status(200).json({ success: true, response: cart });
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = parseInt(req.query.quantity) || 1;
    const cart = await carritos.addProductsToCart(cid, { pid, quantity });
    if (typeof cart != "object") {
      return res.status(400).json({ success: false, response: cart });
    }
    return res.status(200).json({ success: true, response: cart });
  } catch (error) {
    return res.status(500).json({ success: false, response: error });
  }
});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = parseInt(req.query.quantity) || 0;
    const cart = await carritos.deleteProductFromCart(cid, { pid, quantity });
    if (typeof cart != "object") {
      return res.status(400).json({ success: false, response: cart });
    }
    return res.status(200).json({ success: true, response: cart });
  } catch (error) {
    return res.status(500).json({ success: false, response: error });
  }
});

cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await carritos.deleteCart(cid);
    if (cart != "Cart deleted") {
      return res.status(400).json({ success: false, response: cart });
    }
    return res.status(200).json({ success: true, response: cart });
  } catch (error) {
    return res.status(500).json({ success: false, response: error });
  }
});

export default cartsRouter;
