import { messageModel } from "./models/message.model.js";

export default class MessageDaoMongo {
  async getAll() {
    try {
      const response = await messageModel.find({}).lean();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await messageModel.findById(id).lean();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      const response = await messageModel.create(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id) {
    try {
      const response = await messageModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
