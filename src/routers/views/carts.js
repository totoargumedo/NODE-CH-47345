import { Router } from "express";
import * as service from "../../services/carts.services.js";

const cartsRouter = Router();

//get cart
cartsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await service.getById(id);
    res.render("cart", {
      title: "Hutt Commerce",
      products: cart.products,
      cid: id,
    });
  } catch (error) {
    next(error);
  }
});

export default cartsRouter;
