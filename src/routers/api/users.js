import { Router } from "express";
import UserController from "../../controllers/user.controller.js";

const userController = new UserController();
const usersRouter = Router();

usersRouter.post("/login", userController.login);
usersRouter.post("/register", userController.create);

export default usersRouter;
