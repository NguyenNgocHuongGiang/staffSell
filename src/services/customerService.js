const Customer = require('../models/customer');

const getCustomersService = async () => {
    try{
        return await Customer.find();
    }catch(error) {
        console.error('Error getting customers:', error);
        throw error;
    }
}

const getCustomerByPhoneService = async (phone) => {
    try{
        const customer = await Customer.findOne({phoneNumber: phone});
        if(customer){
            return customer;
        }
        else{
            return false;
        }
    }catch(error) {
        console.error('Error getting customer by phone:', error);
        throw error;
    }
}

const createCustomerService = async (customerData) => {
    try{
        const customer = new Customer(JSON.parse(customerData));
        if(await customer.save()){
            return customer;
        }
        else{
            return false;
        }
    }catch(error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

const updateCustomerService = async (customerData) => {
    try{
        const data = JSON.parse(customerData);
        const result = await Customer.findByIdAndUpdate(data._id, {phoneNumber : data.phoneNumber, fullName : data.fullName, address : data.address}, { new: true })
        if(result){
            return true;
        }
        else{
            return false;
        }
    }catch(error) {
        console.error('Error updating customers:', error);
        throw error;
    }
}



module.exports = {getCustomersService, getCustomerByPhoneService, createCustomerService, updateCustomerService} ;