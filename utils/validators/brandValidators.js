const { check } = require("express-validator");

const validationError = require("../../middlewares/validationError");

const brandValidators = {
  getBrandValidator: [
    check("brandId").isMongoId().withMessage("Invalid brand id"),
    validationError,
  ],
  updateBrandValidator: [
    check("brandId").isMongoId().withMessage("Invalid brand id"),
    check("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long")
      .isLength({ max: 32 })
      .withMessage("Name must be at most 32 characters long")
      .trim()
      .toLowerCase(),
    validationError,
  ],
  addBrandValidator: [
    check("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long")
      .isLength({ max: 32 })
      .withMessage("Name must be at most 32 characters long")
      .trim()
      .toLowerCase(),
    validationError,
  ],
  deleteBrandValidator: [
    check("brandId").isMongoId().withMessage("Invalid brand id"),
    validationError,
  ],
};

module.exports = brandValidators;
