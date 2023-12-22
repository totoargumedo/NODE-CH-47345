import { Router } from "express";
import UserController from "../../controllers/user.controller.js";
import passport from "passport";

const userController = new UserController();
const usersRouter = Router();

usersRouter.post(
  "/login",
  passport.authenticate("login"),
  userController.login
);
usersRouter.post(
  "/register",
  passport.authenticate("register"),
  userController.create
);
usersRouter.get("/logout", userController.logout);

usersRouter.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);

usersRouter.get(
  "/profile-github",
  passport.authenticate("github", { scope: ["user:email"] }),
  userController.loginGithub
);

export default usersRouter;
