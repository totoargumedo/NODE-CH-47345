import { productModel } from "./models/product.model.js";

export default class ProductDaoMongo {
  async getAll(page = 1, limit = 10, sort, query) {
    try {
      if (!sort) {
        const response = await productModel.paginate(query, {
          page,
          limit,
          lean: true,
        });
        return response;
      }
      const response = await productModel.paginate(query, {
        page,
        limit,
        lean: true,
        sort: { price: sort },
      });
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
