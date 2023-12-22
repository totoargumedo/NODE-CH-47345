import { userModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";

export default class UserDao {
  async getByEmail(email) {
    try {
      const response = await userModel.findOne({ email }).lean();
      if (!response) {
        return false;
      } else {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await userModel.findById(id).lean();
      if (!response) {
        return false;
      } else {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async create(user) {
    try {
      const userExists = await this.getByEmail(user.email);

      if (userExists) {
        return false;
      }

      if (
        user.email === "adminCoder@coder.com" &&
        user.password === "adminCod3r123"
      ) {
        return await userModel.create({
          ...user,
          password: createHash(user.password),
          role: "admin",
        });
      } else {
        return await userModel.create({
          ...user,
          password: user.password ? createHash(user.password) : createHash(""),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userLogged = await userModel.findOne({ email }).lean();
      if (!userLogged) {
        return false;
      } else {
        const isValid = isValidPassword(password, userLogged);
        if (!isValid) {
          return false;
        } else {
          return userLogged;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
