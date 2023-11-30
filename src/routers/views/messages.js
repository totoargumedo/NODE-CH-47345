import { Router } from "express";
import * as service from "../../services/messages.service.js";

const messagesRouter = Router();

//get cart
messagesRouter.get("/", async (req, res, next) => {
  try {
    const messages = await service.getAll();
    console.log(messages);
    res.render("chat", {
      title: "Hutt Commerce",
    });
  } catch (error) {
    next(error);
  }
});

export default messagesRouter;
