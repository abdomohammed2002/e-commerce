const express = require("express");

const categoryController = require("../controllers/categoryControllers");
const categoryValidators = require("../utils/validators/categoryValidators");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(
    categoryValidators.addCategoryValidator,
    categoryController.addCategory
  );
router
  .route("/:categoryId")
  .get(categoryValidators.getCategoryValidator, categoryController.getCategory)
  .patch(
    categoryValidators.updateCategoryValidator,
    categoryController.updateCategory
  )
  .delete(
    categoryValidators.deleteCategoryValidator,
    categoryController.deleteCategory
  );

module.exports = router;
