
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String, required: true },
  click: {type: Number, default: 0},
  imgUrl: {type: String }
});

export default mongoose.model("Product", productSchema);
