import UserServices from "../services/users.services.js";

const userServices = new UserServices();

export default class UserController {
  async create(req, res, next) {
    try {
      const newUser = await userServices.create(req.body);
      if (!newUser) {
        res.status(400).json({ error: "User already exists" });
      } else {
        res.status(201).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      console.log(req.body);
      const user = await userServices.login(req.body);
      if (!user) {
        res.status(400).json({ error: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      next(error);
    }
  }
}
