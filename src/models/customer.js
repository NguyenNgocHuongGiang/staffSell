const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true,
  },
  fullName: String,
  address: String
}, { timestamps: true });


//Tự động tạo khách hàng mẫu
customerSchema.statics.autoCreateCustomer = async function () {
  try {
    const customer = await this.findOne({
      phoneNumber: '01234567890',
    });

    if (!customer) {
      const admin = new this({ phoneNumber: '01234567890', fullName: 'admin' ,address:'TPHCM'});
      await admin.save();
    } else {
    }
  } catch (error) {
    console.error('Error creating customer test:', error);
    throw error;
  }
};

module.exports = mongoose.model('Customer', customerSchema);


