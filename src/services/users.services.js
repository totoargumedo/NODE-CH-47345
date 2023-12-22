import UserDao from "../daos/mongodb/user.dao.js";

const userDao = new UserDao();

export default class UserServices {
  async create(user) {
    try {
      const newUser = await userDao.create(user);
      if (!newUser) return false;
      else return newUser;
    } catch (error) {
      console.log("User service error: " + error);
    }
  }

  async login(user) {
    try {
      const userLogged = await userDao.login(user);
      if (!userLogged) return false;
      else return userLogged;
    } catch (error) {
      console.log("User service error: " + error);
    }
  }

  async getById(id) {
    try {
      const userExists = await userDao.getById(id);
      if (!userExists) return false;
      else return userExists;
    } catch (error) {
      console.log("User service error: " + error);
    }
  }

  async getByEmail(email) {
    try {
      const userExists = await userDao.getByEmail(email);
      if (!userExists) return false;
      else return userExists;
    } catch (error) {
      console.log("User service error: " + error);
    }
  }
}