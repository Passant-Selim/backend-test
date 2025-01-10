const express = require("express");
const app = express();

require("dotenv").config();
require("./database/db");

const port = process.env.PORT;

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server",
    error: err?.message || [],
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
