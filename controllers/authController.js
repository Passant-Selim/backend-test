const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const AppError = require("../middlewares/AppError");

const predefinedUsers = [
  { username: "admin", password: "adminpassword", role: "admin" },
  { username: "user", password: "userpassword", role: "user" },
];
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = predefinedUsers.find((u) => u.username === username);
    if (!user) {
      return next(new AppError("Invalid username or password", 401));
    }

    if (password !== user.password) {
      return next(new AppError("Invalid username or password", 401));
    }

    const token = await jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    return next(new AppError("An error occurred", 400));
  }
};

module.exports = { login };
