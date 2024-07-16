const {getCustomersService, getCustomerByPhoneService, createCustomerService, updateCustomerService} = require('../services/customerService');

const getCustomers = async (req,res) =>{
    try {
        res.json(await getCustomersService());
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

const getCustomerByPhone = async (req,res) =>{
    try {
        res.json( await getCustomerByPhoneService(req.params.phone) );
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

const createCustomer = async (req,res) =>{
    try {
        res.json( await createCustomerService(req.body.customer));
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

const updateCustomer = async (req,res) =>{
    try {
        res.json( await updateCustomerService(req.body.customer));
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

module.exports =  {getCustomers, getCustomerByPhone, createCustomer, updateCustomer};