import { Schema, model } from "mongoose";

const collection = "products";

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: false, default: true },
  stock: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Sith", "Jedi", "Independent", "Force sensitive"],
  },
  thumbnails: [{ type: String, required: false, default: [] }],
});

export const productModel = model(collection, schema);
