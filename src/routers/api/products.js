import { Router } from "express";
import { productValidator } from "../../middlewares/productValidator.js";
import * as controller from "../../controllers/product.controller.js";
import { imageUploader } from "../../middlewares/multer.js";
import { localThumbnails } from "../../middlewares/localThumbnails.js";

const productsRouter = Router();

//endpoints productos

productsRouter.get("/", controller.getAll);

productsRouter.get("/:id", controller.getById);

productsRouter.post("/", productValidator, controller.create);

productsRouter.post(
  "/img",
  imageUploader.single("image"),
  productValidator,
  localThumbnails,
  controller.create
);

productsRouter.put("/:id", controller.update);

productsRouter.delete("/:id", controller.remove);

export default productsRouter;
