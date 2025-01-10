# Product Inventory API

This is a RESTful API for managing a product inventory system, built using Node.js, Express, and MongoDB (Mongoose). It supports JWT-based authentication and role-based authorization.

---

## Features

- **Authentication**: JWT-based login for users and admin.
- **Role-based Authorization**: Admin-only routes for adding, updating, and deleting products.
- **Product Management**: CRUD operations with validations and pagination.
- **Optimized Queries**: SQL/NoSQL queries for efficient data retrieval.

## Query Optimization
Fetch products with a price between $50 and $200, ordered by price (ascending), with pagination (10 products per page):

### SQL Query (PostgreSQL)

#### Query:
```sql
SELECT * 
FROM products 
WHERE price BETWEEN 50 AND 200 
ORDER BY price ASC 
LIMIT 10 OFFSET (page_number - 1) * 10;

```` NoSQL Query (MongoDB)
const minPrice = 50;
const maxPrice = 200;
const page = 1; // Current page
const limit = 10; // Number of products per page
const skip = (page - 1) * limit;

const products = await Product.find({
  price: { $gte: minPrice, $lte: maxPrice }
})
  .sort({ price: 1 }) // Sort by price ascending
  .skip(skip)
  .limit(limit);

console.log(products);

************************************

## Optimizations for High Traffic Scenarios

1- Indexing:
SQL: Create an index on the price column.

CREATE INDEX idx_price ON products(price);

NoSQL: Create an index on the price field.

Product.collection.createIndex({ price: 1 });

2- Caching:
Use a caching system like Redis to store frequently accessed queries and reduce database load.

3- Database Sharding:
For MongoDB, shard the collection by a field like category to distribute the load across multiple servers.

4- Query Analysis:
SQL: Use EXPLAIN to analyze query execution plans.

NoSQL: Use explain() to evaluate the performance of MongoDB queries:
db.products.explain("executionStats").find({
  price: { $gte: 50, $lte: 200 }
}).sort({ price: 1 });