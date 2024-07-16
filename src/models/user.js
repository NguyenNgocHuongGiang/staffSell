const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//Định nghĩa user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true
  },
  role: { type: String, enum: ['ADMIN', 'STAFF'], default: 'STAFF' },
  fullName: { type: String, default: "" },
  urlAvatar: { type: String, default: "" },
  gender: { type: String, default: "" },
  birthday: { type: String, default: "" },
  isActive: { type: Boolean, default: false },
  isLock: { type: Boolean, default: false },
  isFirstLogin: { type: Boolean, default: true },
  soldList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });



//Tự động tạo admin
userSchema.statics.autoCreateAdmin = async function () {
  try {
    const user = await this.findOne({
      email: new RegExp(`^admin@`, 'i'),
    });

    if (!user) {
      const admin = new this({ email: 'admin@gmail.com', password: 'admin' ,role:'ADMIN'});
      await admin.save();
      console.log('Automatically initialized admin.');
    } else {
      console.log('Admin is available.');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};

//Mã hóa mật khẩu
userSchema.pre('save', async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(7);
  this.password = await bcrypt.hash(user.password, salt);
});

//Kiểm tra mật khẩu
userSchema.methods.checkPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);


