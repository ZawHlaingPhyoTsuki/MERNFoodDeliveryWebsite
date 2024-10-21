import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } // we add this minimize false so this cartData entry will be created without any data
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema); // if the model(mongoose.models.user) is already created, this model will be used || if the model is not created, it (mongoose.model('user',userSchema)) will create a new model

export default userModel;
