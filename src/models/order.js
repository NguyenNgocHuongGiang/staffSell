const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  saleId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  products: [{
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number,
    totalPrice: Number
  }],
  totalAmount: Number,
  moneyReceived: Number,
  moneyBack: Number,
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

