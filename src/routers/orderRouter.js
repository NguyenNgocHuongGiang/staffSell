const express = require("express");
const {getOrder, createOrder, getOrderByTime} = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.get('/', (req, res) => {
    res.render('/order', {user : req.session.user});
});

orderRouter.get('/list', getOrder);
orderRouter.get('/:start/:end', getOrderByTime);
orderRouter.post('/create', createOrder);

module.exports = orderRouter;