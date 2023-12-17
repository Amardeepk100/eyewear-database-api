const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

require("dotenv").config();

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;

// Connect to MongoDB database
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for "products" collection
const productSchema = new mongoose.Schema({
    _id: ObjectId,
    brand: String,
    model_no: String,
    product_type: String,
    product_color: String,
    product_price: Number,
    gender: String,
    frame_type: String,
    frame_shape: String,
    material: String,
    image_paths: Array,
});

// Create a model for the "products" collection
const Product = mongoose.model("Product", productSchema);

router.get("", async (req, res) => {
    const query = req.query;
    const minPrice = parseInt(query.minPrice);
    const maxPrice = parseInt(query.maxPrice);
    const limit = parseInt(req.query.limit) || 5;
    const skip = parseInt(req.query.skip) || 0;

    const priceRangeQuery = {
        product_price: { $gte: minPrice, $lte: maxPrice },
      };
    const combinedQuery = {
    $and: [query, priceRangeQuery],
    };
  
    try {
      if (minPrice && maxPrice && Object.keys(query).length>2) {
        delete query.minPrice;
        delete query.maxPrice;
        delete query.limit;
        delete query.skip;
        // If both minPrice and maxPrice are provided, filter by price range.
        const products = await Product.find(combinedQuery).skip(skip).limit(limit);
  
        if (!products || products.length === 0) {
          return res.status(404).json({ error: "No products found in the specified price range or catergories" });
        }
  
        res.json(products);
      }
      else if (minPrice && maxPrice) {
        delete query.minPrice;
        delete query.maxPrice;
        delete query.limit;
        delete query.skip;
        // If both minPrice and maxPrice are provided, filter by price range.
        const products = await Product.find(combinedQuery);
  
        if (!products || products.length === 0) {
          return res.status(404).json({ error: "No products found in the specified price range" });
        }
  
        res.json(products);
      }
      else {
        // If no price range is provided, filter based on other query parameters.
        // Remove the "minPrice" and "maxPrice" fields from the query.
        delete query.minPrice;
        delete query.maxPrice;
        delete query.limit;
        delete query.skip;
  
        const products = await Product.find(query).skip(skip).limit(limit);
  
        if (!products || products.length === 0) {
          return res.status(404).json({ error: "No products found" });
        }
  
        res.json(products);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  
router.get("/search", async (req, res) => {
const searchTerm = req.query.q; // Get the search term from the query parameters

try {
    delete searchTerm.limit;
    delete searchTerm.skip;
    const limit = parseInt(req.query.limit) || 5;
    const skip = parseInt(req.query.skip) || 0;

    const products = await Product.find({
    $or: [
        { brand: { $regex: searchTerm, $options: "i" } },
        { model_no: { $regex: searchTerm, $options: "i" } },
        { product_type: { $regex: searchTerm, $options: "i" } },
        { gender: { $regex: searchTerm, $options: "i" } },
        { frame_type: { $regex: searchTerm, $options: "i" } },
        { frame_shape: { $regex: searchTerm, $options: "i" } },
        { material: { $regex: searchTerm, $options: "i" } },
    ],
    }).skip(skip).limit(limit);

    if (products.length === 0) {
    return res.status(404).json({ error: "No matching products found" });
    }

    res.json(products);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
}
});

router.get("/:id", async (req, res) => {
const productId = req.params.id; // The URL parameter is already in the correct format

try {
    // Find a product by its _id
    const product = await Product.findById({ _id: productId });

    if (!product) {
    return res.status(404).json({ error: "Product not found", id: productId });
    }

    res.json(product);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
}
});

module.exports = router;