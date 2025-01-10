const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError("Invalid token", 401));
  }
};

const adminMiddleware = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
