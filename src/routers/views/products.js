import { Router } from "express";
import * as service from "../../services/product.services.js";
import { sessionHandler } from "../../middlewares/sessionHandler.js";
import { validateAdmin } from "../../middlewares/validateAdmin.js";

const productsRouter = Router();

//realtimeproducts
productsRouter.get(
  "/realtimeproducts",
  validateAdmin,
  async (req, res, next) => {
    try {
      res.render("realtime", {
        title: "Hutt Commerce",
        user: req.session.user.first_name,
      });
    } catch (error) {
      next(error);
    }
  }
);
//products
productsRouter.get("/", sessionHandler, async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const products = await service.getAll(page, limit);
    //separo el primer producto para el destacado
    res.render("products", {
      title: "Hutt Commerce",
      active: products.docs[0],
      products: products,
      user: req.session.user.first_name,
    });
  } catch (error) {
    next(error);
  }
});

//product id
productsRouter.get("/:id", sessionHandler, async (req, res, next) => {
  try {
    const product = await service.getById(req.params.id);
    //separo el primer producto para el destacado
    res.render("product", {
      title: "Hutt Commerce",
      product: product,
      user: req.session.user.first_name,
    });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
