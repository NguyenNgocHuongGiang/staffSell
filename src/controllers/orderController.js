const {getOrderService, createOrderService, getOrderByTimeService, getOrderByCustomerIdService} = require('../services/orderService');

const getOrder = async (req,res) =>{
    try {
        res.json(await getOrderService());
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

const createOrder = async (req,res) =>{
    try {
        console.log("áđá")
        console.log(req.body.order)
        res.json( await createOrderService(req.body.order));
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

const getOrderByTime = async (req,res) =>{
    try {
        res.json(await getOrderByTimeService(req.params.start, req.params.end));
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

const getHistoryPurschase = async (req,res) => {
    try {
        const history = await getOrderByCustomerIdService(req.params.id)
        res.render('history',{user : req.session.user, history : history, moment : require("moment")});
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

module.exports = {getOrder, createOrder, getOrderByTime, getHistoryPurschase}