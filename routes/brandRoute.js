const express = require("express");

const brandControllers = require("../controllers/brandControllers");
const brandValidators = require("../utils/validators/brandValidators");

const router = express.Router();

router
  .route("/")
  .get(brandControllers.getBrands)
  .post(brandValidators.addBrandValidator, brandControllers.addBrand);
router
  .route("/:brandId")
  .get(brandValidators.getBrandValidator, brandControllers.getBrand)
  .patch(brandValidators.updateBrandValidator, brandControllers.updateBrand)
  .delete(brandValidators.deleteBrandValidator, brandControllers.deleteBrand);

module.exports = router;
