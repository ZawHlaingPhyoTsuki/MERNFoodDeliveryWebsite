import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {type: String,required: true,},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema); // "food" is the name of the collection in MongoDB // if this model (mongoose.models.food) is already there, it will be used, if it is not there, it will be created a new model ( mongoose.model("food", foodSchema))

export default foodModel;