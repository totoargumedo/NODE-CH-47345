import { Router } from "express";
import productsRouter from "./products.js";
import * as service from "../../services/product.services.js";
import cartsRouter from "./carts.js";
import messagesRouter from "./messages.js";
import usersRouter from "./users.js";
import errorsRouter from "./errors.js";

const viewsRouter = Router();

//vistas
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/cart", cartsRouter);
viewsRouter.use("/chat", messagesRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/errors", errorsRouter);
//index page
viewsRouter.get("/", async (req, res, next) => {
  try {
    if (req.session.user) {
      const products = await service.getAll(1, 3);
      res.render("index", {
        title: "Hutt Commerce",
        products: products.docs,
        user: req.session.user.first_name,
      });
    } else {
      res.render("index", {
        title: "Hutt Commerce",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
