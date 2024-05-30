const asyncHandler = require("express-async-handler");

const Product = require("../database/models/productsModel");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");

const getProducts = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const products = await Product.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { products } });
});

const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    const error = new AppError(404, httpStatusText.FAIL, "product not found");
    return next(error);
  }
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { product } });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    const error = new AppError(404, httpStatusText.FAIL, "product not found");
    return next(error);
  }
  const updatedProduct = await Product.updateOne(
    { _id: req.params.productId },
    {
      $set: {
        ...req.body,
      },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { product: updatedProduct },
  });
});

const addProduct = asyncHandler(async (req, res, next) => {
  const product = new Product(req.body);
  await product.save();
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { product } });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    const error = new AppError(404, httpStatusText.FAIL, "product not found");
    return next(error);
  }
  const deletedProduct = await Product.deleteOne({
    _id: req.params.productId,
  });
  return res.status(204).json({
    status: httpStatusText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct,
};
