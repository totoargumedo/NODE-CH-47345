import { Schema, model } from "mongoose";

const collection = "messages";

const schema = new Schema({
  user: { type: String, required: true, index: true },
  message: { type: String, required: true },
});

export const messageModel = model(collection, schema);
