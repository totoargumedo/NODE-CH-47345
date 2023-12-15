import { Router } from "express";

const usersRouter = Router();

//get cart
usersRouter.get("/:id", async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
