const { check } = require("express-validator");

const validationError = require("../../middlewares/validationError");
const Category = require("../../database/models/categoriesModel");
const Subcategory = require("../../database/models/subcategoriesModel");
const AppError = require("../../utils/appError");
const httpStatusText = require("../../utils/httpStatusText");

const productValidators = {
  getProductValidator: [
    check("productId").isMongoId().withMessage("Invalid product id"),
    validationError,
  ],
  updateProductValidator: [
    check("productId").isMongoId().withMessage("Invalid product id"),
    check("title")
      .isString()
      .withMessage("Title must be string")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Too short product name")
      .isLength({ max: 32 })
      .withMessage("Too long product name"),
    check("description")
      .isString()
      .withMessage("Description must be string")
      .notEmpty()
      .withMessage("product description is required")
      .isLength({ min: 10 })
      .withMessage("too short description")
      .isLength({ max: 100 })
      .withMessage("too long description"),
    check("ratingAverage")
      .isNumeric()
      .withMessage("Rating must be number")
      .isLength({ min: 1 })
      .withMessage("must be at least 1")
      .isLength({ max: 5 })
      .withMessage("must be at most 5i"),
    check("ratingQuantity")
      .isNumeric()
      .withMessage("rainting quantity should be number"),
    check("price").isNumeric().withMessage("price should be a number"),
    check("priceAfterDiscount")
      .isNumeric()
      .withMessage("price should be number")
      .custom((value, { req }) => {
        if (value > req.body.price) {
          throw new AppError(
            400,
            httpStatusText.FAIL,
            "priceAfterDiscount must be less than price"
          );
        }
      }),
    check("imageCover")
      .isString()
      .withMessage("type not defined")
      .notEmpty()
      .withMessage("imageCover is required"),
    check("images").isString().withMessage("type not defined"),
    check("colors").isString().default("red"),
    check("quantities")
      .isNumeric()
      .withMessage("quantities should be a number")
      .default(0),
    check("sold").isNumeric().default(0),
    check("category")
      .isMongoId()
      .withMessage("invalid object id")
      .notEmpty()
      .withMessage("category is require")
      .custom((categoryId) => {
        Category.findById(categoryId).then((category) => {
          if (!category) {
            return promise.reject(
              new AppError(404, httpStatusText.FAIL, "category not found")
            );
          }
        });
      }),
    check("subcategory")
      .isMongoId()
      .withMessage("invalid object id")
      .notEmpty()
      .withMessage("subcategory is require")
      .custom((subcategoryId) => {
        Subcategory.findById({ _id: { $in: subcategoryId } }).then(
          (subcategories) => {
            if (
              !subcategories ||
              subcategories.length !== subcategoryId.length
            ) {
              return promise.reject(
                new AppError(404, httpStatusText.FAIL, "subcategory not found")
              );
            }
          }
        );
      })
      .custom((subcategoryId, { req }) => {
        Subcategory.findById({ category: req.body.category }).then(
          (subcategories) => {
            if (!subcategories) {
              return Promise.reject(
                new AppError(404, httpStatusText.FAIL, "subcategory not found")
              );
            } else {
              const subcategory = subcategories.every((subcategory) =>
                subcategoryId.includes(subcategory._id.toString())
              );
              if (!subcategory) {
                return promise.reject(
                  new AppError(
                    404,
                    httpStatusText.FAIL,
                    "subcategory not found"
                  )
                );
              }
            }
          }
        );
      }),
    check("brand")
      .isMongoId()
      .withMessage("invalid object id")
      .notEmpty()
      .withMessage("brand is require"),
    validationError,
  ],
  addProductValidator: [
    check("title")
      .isString()
      .withMessage("Title must be string")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Too short product name"),
    check("description")
      .isString()
      .withMessage("Description must be string")
      .notEmpty()
      .withMessage("product description is required")
      .isLength({ min: 10 })
      .withMessage("too short description"),
    check("ratingAverage")
      .isNumeric()
      .withMessage("Rating must be number")
      .isLength({ min: 1 })
      .withMessage("must be at least 1")
      .isLength({ max: 5 })
      .withMessage("must be at most 5i"),
    check("ratingQuantity")
      .isNumeric()
      .withMessage("rainting quantity should be number"),
    check("price").isNumeric().withMessage("price should be a number"),
    check("priceAfterDiscount")
      .isNumeric()
      .withMessage("price should be number"),
    check("imageCover")
      .isString()
      .withMessage("type not defined")
      .notEmpty()
      .withMessage("imageCover is required"),
    check("images").isString().withMessage("type not defined"),
    check("colors").isString().default("red"),
    check("quantities")
      .isNumeric()
      .withMessage("quantities should be a number")
      .default(0),
    check("sold").isNumeric().default(0),
    check("category")
      .isMongoId()
      .withMessage("invalid object id")
      .notEmpty()
      .withMessage("category is require"),
    check("subcategory")
      .optional()
      .isMongoId()
      .withMessage("invalid object id"),
    check("brand").optional().isMongoId().withMessage("invalid object id"),
    validationError,
  ],
  deleteProductValidator: [
    check("productId").isMongoId().withMessage("Invalid product id"),
    validationError,
  ],
};

module.exports = productValidators;
