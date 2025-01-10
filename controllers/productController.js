const Product = require("../models/product");
const AppError = require("../middlewares/AppError");

const getAllProducts = async (req, res, next) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort = "price",
    } = req.query;

    const query = {};

    if (category) {
      query.category = category; // Filter by category
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Sorting logic
    const sortCriteria = {};
    const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
    sortCriteria[sortField] = sort.startsWith("-") ? -1 : 1;

    // Fetch products from DB
    const products = await Product.find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await Product.countDocuments(query);

    // Return the products and pagination data
    res.status(200).json({
      products,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
      totalProducts: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { name, category, price, quantity } = req.body;
    const newProduct = new Product({ name, category, price, quantity });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return next(new AppError("Product not found", 404));
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
