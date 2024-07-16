const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    barcode: {
        type: String,
        index: true,
        unique: true
    },
    productName: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    importPrice: Number,
    retailPrice: Number,
    category: String,
    inventory: Number
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);

