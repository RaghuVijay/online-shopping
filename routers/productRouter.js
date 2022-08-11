const express = require("express");
const { authorize } = require("./../middelWares/authorize");
router = express.Router();
const {
  findProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./../controllers/productController");
router.get("/find/:productId?", authorize, findProducts);
router.post("/create", authorize, createProduct);
router.patch("/update/:productId", authorize, updateProduct);
router.delete("/delete/:productId", authorize, deleteProduct);
module.exports = router;
