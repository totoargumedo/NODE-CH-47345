import UserServices from "../services/users.services.js";

const userServices = new UserServices();

export default class UserController {
  async create(req, res, next) {
    try {
      const newUser = await userServices.create(req.body);
      if (!newUser) {
        res.redirect("/users/register-error");
      } else {
        res.redirect("/");
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await userServices.login(req.body);
      if (!user) {
        res.redirect("/users/login-error");
      } else {
        req.session.user = user;
        res.redirect("/");
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
}
