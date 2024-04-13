const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    imageUrl: String
});

const ProductModal = mongoose.model("products",ProductSchema)

module.exports = ProductModal