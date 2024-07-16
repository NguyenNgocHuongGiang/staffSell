
const express = require("express");
const {getCustomers, getCustomerByPhone,createCustomer, updateCustomer} = require('../controllers/customerController');
const {getHistoryPurschase} = require('../controllers/orderController');

const customerRouter = express.Router();

customerRouter.get('/', (req, res) => {
    res.render('customers', {user : req.session.user});
});
customerRouter.get('/list', getCustomers);
customerRouter.get('/:phone', getCustomerByPhone);
customerRouter.post('/create', createCustomer);
customerRouter.put('/update', updateCustomer);
customerRouter.get('/history/:id', getHistoryPurschase)

module.exports = customerRouter;