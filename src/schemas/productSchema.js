const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName : mongoose.Schema.Types.String,
    price : mongoose.Schema.Types.Number
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;