const { check } = require("express-validator");

const validationError = require("../../middlewares/validationError");
const Category = require("../../database/models/categoriesModel");
const AppError = require("../../utils/appError");
const httpStatusText = require("../../utils/httpStatusText");

const subcategoryValidators = {
  getSubcategoryValidator: [
    check("subcategoryId").isMongoId().withMessage("Invalid subcategory id"),
    validationError,
  ],
  updateSubcategoryValidator: [
    check("subcategoryId").isMongoId().withMessage("Invalid subcategory id"),
    check("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long")
      .isLength({ max: 32 })
      .withMessage("Name must be at most 32 characters long")
      .trim()
      .toLowerCase(),
    check("category").optional().isMongoId().withMessage("Invalid category id"),
    validationError,
  ],
  addSubcategoryValidator: [
    check("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long")
      .isLength({ max: 32 })
      .withMessage("Name must be at most 32 characters long")
      .trim()
      .toLowerCase(),
    check("category")
      .notEmpty()
      .withMessage("Category is required")
      .custom((categoryId) => {
        console.log("category check from validator", categoryId);
        return Category.findById(categoryId).then((category) => {
          if (!category) {
            console.log("category check from validator from if", category);
            const error = new AppError(
              404,
              httpStatusText.FAIL,
              "category not found"
            );
            return Promise.reject(error);
          }
        });
      }),
    validationError,
  ],
  deleteSubcategoryValidator: [
    check("subcategoryId").isMongoId().withMessage("Invalid subcategory id"),
    validationError,
  ],
};

module.exports = subcategoryValidators;
