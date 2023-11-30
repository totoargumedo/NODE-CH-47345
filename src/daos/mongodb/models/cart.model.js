import { Schema, model } from "mongoose";

const collection = "carts";

const schema = new Schema({
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, required: true },
      _id: false,
    },
  ],
});

export const cartModel = model(collection, schema);
