const mongoose = require("mongoose");
const subcategoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please enter category name"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    // slug: {
    //   type: String,
    //   toLowerCase: true,
    // },
    image: String,
  },
  { timestamp: true }
);
module.exports = new mongoose.model("Subcategory", subcategoriesSchema);
