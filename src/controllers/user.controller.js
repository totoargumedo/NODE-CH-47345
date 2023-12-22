import UserServices from "../services/users.services.js";

const userServices = new UserServices();

export default class UserController {
  async create(req, res, next) {
    try {
      if (!req.session.passport) {
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
      const id = req.session.passport.user;
      const user = await userServices.getById(id);
      if (!user) {
        res.redirect("/users/login-error");
      } else {
        req.session.user = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
        };
        res.redirect("/");
      }
    } catch (error) {
      next(error);
    }
  }

  async loginGithub(req, res, next) {
    try {
      const id = req.session.passport.user;
      const user = await userServices.getById(id);
      if (!user) {
        res.redirect("/users/login-error");
      } else {
        req.session.user = {
          first_name: user.first_name,
          email: user.email,
        };
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
