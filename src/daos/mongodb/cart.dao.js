import { cartModel } from "./models/cart.model.js";

export default class CartDaoMongo {
  async getAll() {
    try {
      const response = await cartModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await cartModel
        .findById(id)
        .populate("products.product_id")
        .lean();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create() {
    try {
      const newCart = { products: [] };
      const response = await cartModel.create(newCart);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductById(id, data) {
    try {
      const productInCart = await cartModel.findById({
        _id: id,
        "products.product_id": data.id,
      });
      console.log(productInCart);
      const response = await cartModel.findByIdAndUpdate(
        id,
        {
          $push: {
            products: { product_id: data.pid, quantity: data.quantity },
          },
        },
        { new: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProductById(id, data) {
    try {
      const response = await cartModel.findByIdAndUpdate(
        id,
        { $pull: { products: { product_id: { $eq: data.pid } } } },
        { new: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id) {
    try {
      const response = await cartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
