const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  category: String,
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"],
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity must be a non-negative integer"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
