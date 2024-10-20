import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://tsukuyomi:09973264164zhp12@cluster0.79r9s.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
