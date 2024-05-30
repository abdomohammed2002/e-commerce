const express = require("express");

const subcategoryController = require("../controllers/subcategoryControllers");
const subcategoryValidators = require("../utils/validators/subcategoryValidators");
const getSubcategoriesFilter = require("../middlewares/getSubcategoriesFilter");
const setCategoryIdToBody = require("../middlewares/setCategoryIdToBody");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getSubcategoriesFilter, subcategoryController.getSubcategories)
  .post(
    setCategoryIdToBody,
    subcategoryValidators.addSubcategoryValidator,
    subcategoryController.addSubcategory
  )
  .delete(subcategoryController.deleteSubcategories);
router
  .route("/:subcategoryId")
  .get(
    subcategoryValidators.getSubcategoryValidator,
    subcategoryController.getSubcategory
  )
  .patch(
    subcategoryValidators.updateSubcategoryValidator,
    subcategoryController.updateSubcategory
  )
  .delete(
    subcategoryValidators.deleteSubcategoryValidator,
    subcategoryController.deleteSubcategory
  );
module.exports = router;
