const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema({
    productName: {
        type: String,
        required: [true, "productName must be provided"],
    },
    productDescription: {
        type: Text,
        required: [true, "productDescription must be provided"],
    },
    productPrice: {
        type: Number,
        required: [true, "productPrice must be provided"],
    },
    productStatus: {
        type: String,
        enum: ["available", "unavailable"]
    },
    productStockQty: {
        type: Number,
        required: [true, "productStockQty must be provided"]
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema)
module.exports = Product