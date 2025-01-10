const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  optimizeProducts,
} = require("../controllers/productController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const validateProduct = require("../middlewares/validationMiddleware");

// user routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// admin routes
router.post("/", authMiddleware, adminMiddleware, validateProduct, addProduct);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateProduct,
  updateProduct
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
