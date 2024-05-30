const asyncHandler = require("express-async-handler");

const Subcategory = require("../database/models/subcategoriesModel");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");
const factors = require("../utils/factors.js");

// const getSubcategories = asyncHandler(async (req, res, next) => {
//   const { page = 1, limit = 5 } = req.query;
//   const skip = (page - 1) * limit;
//   const subcategories = await Subcategory.find(req.filter, { __v: false })
//     .populate({ path: "category", select: "name -_id" })
//     .limit(limit)
//     .skip(skip);
//   res.status(200).json({
//     status: httpStatusText.SUCCESS,
//     data: { subcategories },
//   });
// });

const getSubcategories = factors.getAll(Subcategory);

const getSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.subcategoryId);
  if (!subcategory) {
    const error = new AppError(
      404,
      httpStatusText.FAIL,
      "subcategory not found"
    );
    return next(error);
  }
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { subcategory } });
});

const updateSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.subcategoryId);
  if (!subcategory) {
    const error = new AppError(
      404,
      httpStatusText.FAIL,
      "subcategory not found"
    );
    return next(error);
  }
  const updatedSubcategory = await Subcategory.updateOne(
    { _id: req.params.subcategoryId },
    {
      $set: {
        ...req.body,
      },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { subcategory: updatedSubcategory },
  });
});

const addSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = new Subcategory(req.body);
  await subcategory.save();
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { subcategory } });
});

const deleteSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.subcategoryId);
  if (!subcategory) {
    const error = new AppError(
      404,
      httpStatusText.FAIL,
      "subcategory not found"
    );
    return next(error);
  }
  const deletedSubcategory = await Subcategory.deleteOne({
    _id: req.params.subcategoryId,
  });
  return res.status(204).json({
    status: httpStatusText.SUCCESS,
    data: null,
  });
});

const deleteSubcategories = asyncHandler(async (req, res, next) => {
  let filter = req.query.filter;
  const deletedSubcategories = await Subcategory.deleteMany({
    name: new RegExp(filter, "ig"),
  });
  return res.status(204).json({
    status: httpStatusText.SUCCESS,
    data: deletedSubcategories,
  });
});

module.exports = {
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  addSubcategory,
  deleteSubcategory,
  deleteSubcategories,
};
