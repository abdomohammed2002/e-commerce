const mongoose = require("mongoose");
const brandsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please enter brand name"],
      unique: [true, "brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    // slug: {
    //   type: String,
    //   toLowerCase: true,
    // },
    image: String,
  },
  { timestamp: true }
);
module.exports = new mongoose.model("Brand", brandsSchema);
