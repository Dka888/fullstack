import mongoose from "mongoose";

const basketItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    status: { type: String, enum: ["in_cart", "purchased"], default: "in_cart" },
  });

export default mongoose.model("BasketItem", basketItemSchema);
