const mongoose = require("mongoose") ;
const config = require('./config');
const User = require('../models/user');
const Customer = require('../models/customer');
const { mongodb_url } = config;


const dbConnected = async () => {
  try {
    mongoose
      .connect(mongodb_url)
      .then(() =>
        console.info(`MongoDB Connected to ${mongodb_url}`)
      )
      .catch(err => console.error(err));
  } catch (error) {
    console.info(`MongoDB failed to connect to ${mongodb_url}`,error);
    return null;
  }
};

User.autoCreateAdmin();
Customer.autoCreateCustomer();
module.exports = { dbConnected };
