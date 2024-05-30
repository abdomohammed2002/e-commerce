const mongoose = require("mongoose");
const categoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please enter category name"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    // slug: {
    //   type: String,
    //   toLowerCase: true,
    // },
    image: String,
  },
  { timestamp: true }
);
module.exports = new mongoose.model("Category", categoriesSchema);
