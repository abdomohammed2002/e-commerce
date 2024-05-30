const asyncHandler = require("express-async-handler");

const Category = require("../database/models/categoriesModel");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");

const getCategories = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { categories } });
});

const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    const error = new AppError(404, httpStatusText.FAIL, "category not found");
    return next(error);
  }
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { category } });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    const error = new AppError(404, httpStatusText.FAIL, "category not found");
    return next(error);
  }
  const updatedCategory = await Category.updateOne(
    { _id: req.params.categoryId },
    {
      $set: {
        ...req.body,
      },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { category: updatedCategory },
  });
});

const addCategory = asyncHandler(async (req, res, next) => {
  const category = new Category(req.body);
  await category.save();
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { category } });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    const error = new AppError(404, httpStatusText.FAIL, "category not found");
    return next(error);
  }
  const deletedCategory = await Category.deleteOne({
    _id: req.params.categoryId,
  });
  return res.status(204).json({
    status: httpStatusText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getCategories,
  getCategory,
  updateCategory,
  addCategory,
  deleteCategory,
};
