import { userModel } from "./models/user.model.js";

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

  async create(user) {
    try {
      const userExists = await this.getByEmail(user.email);
      if (userExists) {
        return false;
      }
      const response = await userModel.create(user);
      if (!response) {
        return false;
      } else {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    const { email, password } = user;
    const userLogged = await userModel.findOne({ email, password }).lean();
    if (!userLogged) {
      return false;
    } else {
      return userLogged;
    }
  }
}
