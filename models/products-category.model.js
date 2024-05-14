const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productsCategotySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
})

const ProductCategory = mongoose.model("ProductCategory", productsCategotySchema, "products-category");

module.exports = ProductCategory;