const mongoose = require("mongoose");

const dbConnect = async () => {
  const uri = process.env.DB_URI;
  await mongoose.connect(uri);
  console.log("connected to db");
};

module.exports = dbConnect;
