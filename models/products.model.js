const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean
})

const Product = mongoose.model("Product", productsSchema, "products");

module.exports = Product;