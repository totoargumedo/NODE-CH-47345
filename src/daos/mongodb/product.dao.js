import { productModel } from "./models/product.model.js";

export default class ProductDaoMongo {
  async getAll(limit) {
    try {
      const response = await productModel.find({}).limit(limit).lean();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await productModel.findById(id).lean();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      const response = await productModel.create(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, data) {
    try {
      const response = await productModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id) {
    try {
      const response = await productModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
