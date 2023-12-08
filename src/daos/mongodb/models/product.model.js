import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    enum: ["Sith", "Jedi", "Independent", "Force sensitive", "Mandalorian"],
  },
  thumbnails: [{ type: String, required: false, default: [] }],
});

schema.plugin(mongoosePaginate);

export const productModel = model(collection, schema);
