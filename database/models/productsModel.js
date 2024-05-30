const mongoose = require("mongoose");
const productsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please enter product name"],
      unique: [true, "product must be unique"],
      minlength: [3, "Too short product name"],
      maxlength: [32, "Too long product name"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "product description is required"],
      minlength: [10, "too short description"],
      maxlength: [100, "too long description"],
    },
    ratingAverage: {
      type: Number,
      min: [1, "must be at least 1"],
      max: [5, "must be at most 5"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
    },
    imageCover: {
      type: String,
      required: true,
    },
    images: [String],
    colors: [String],
    quantities: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  { timestamp: true }
);
module.exports = new mongoose.model("Product", productsSchema);
