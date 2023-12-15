import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.DB_CONNECTION);
  console.log("DB connected successfully");
} catch (error) {
  console.log("DB connection error: " + error);
}
