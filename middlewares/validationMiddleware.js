const { body } = require("express-validator");

const validateProduct = [
  body("name").notEmpty().withMessage("Name is required"),
  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

module.exports = validateProduct;
