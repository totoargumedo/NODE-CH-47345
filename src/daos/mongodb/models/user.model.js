import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, default: "" },
  role: { type: String, default: "user" },
  isGithub: { type: Boolean, required: true, default: false },
});

export const userModel = model(collection, schema);
