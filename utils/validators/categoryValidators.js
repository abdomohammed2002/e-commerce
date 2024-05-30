const { check } = require("express-validator");

const validationError = require("../../middlewares/validationError");

const categoryValidators = {
  getCategoryValidator: [
    check("categoryId").isMongoId().withMessage("Invalid category id"),
    validationError,
  ],
  updateCategoryValidator: [
    check("categoryId").isMongoId().withMessage("Invalid category id"),
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
  addCategoryValidator: [
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
  deleteCategoryValidator: [
    check("categoryId").isMongoId().withMessage("Invalid category id"),
    validationError,
  ],
};

module.exports = categoryValidators;
