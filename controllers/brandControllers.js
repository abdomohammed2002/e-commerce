const asyncHandler = require("express-async-handler");

const Brand = require("../database/models/brandsModel");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");

const getBrands = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}, { __v: false }).limit(limit).skip(skip);
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { brands } });
});

const getBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.brandId);
  if (!brand) {
    const error = new AppError(404, httpStatusText.FAIL, "brand not found");
    return next(error);
  }
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { brand } });
});

const updateBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.brandId);
  if (!brand) {
    const error = new AppError(404, httpStatusText.FAIL, "brand not found");
    return next(error);
  }
  const updatedBrand = await Brand.updateOne(
    { _id: req.params.brandId },
    {
      $set: {
        ...req.body,
      },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { brand: updatedBrand },
  });
});

const addBrand = asyncHandler(async (req, res, next) => {
  const brand = new Brand(req.body);
  await brand.save();
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { brand } });
});

const deleteBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.brandId);
  if (!brand) {
    const error = new AppError(404, httpStatusText.FAIL, "brand not found");
    return next(error);
  }
  const deletedBrand = await Brand.deleteOne({
    _id: req.params.brandId,
  });
  return res.status(204).json({
    status: httpStatusText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getBrands,
  getBrand,
  updateBrand,
  addBrand,
  deleteBrand,
};
