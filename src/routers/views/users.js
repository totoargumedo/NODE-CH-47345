import { Router } from "express";

const usersRouter = Router();

//register
usersRouter.get("/register", async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error);
  }
});

//register-error
usersRouter.get("/register-error", async (req, res, next) => {
  try {
    res.render("register-error");
  } catch (error) {
    next(error);
  }
});

//login-error
usersRouter.get("/login-error", async (req, res, next) => {
  try {
    res.render("login-error");
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
