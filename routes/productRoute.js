const express = require("express");

const productController = require("../controllers/productControllers");
const productValidators = require("../utils/validators/productValidators");

const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productValidators.addProductValidator, productController.addProduct);
router
  .route("/:productId")
  .get(productValidators.getProductValidator, productController.getProduct)
  .patch(
    productValidators.updateProductValidator,
    productController.updateProduct
  )
  .delete(
    productValidators.deleteProductValidator,
    productController.deleteProduct
  );

module.exports = router;
