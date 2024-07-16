const nodemailer = require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config/config.js');

const sendActivationEmail = async function(email) {
  try {
    // Tạo token xác nhận kích hoạt với thời hạn là 1 phút
    const token = jsonwebtoken.sign({ email }, config.secret_key, { expiresIn: '1m' });

    // Tạo link kích hoạt từ token và cấu hình host
    const activationLink = `${config.host}activateUser/${token}`;

    // Tạo một đối tượng transporter để gửi email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'huonggiang7657@gmail.com',
        pass: 'supm iwpj kzmn errc',
      },
    });

    // Cấu hình thông tin email
    let mailOptions = {
      from: 'huonggiang7657@gmail.com',
      to: email,
      subject: 'Nodejs Project - Account Activation',
      text: `Click on the link below to activate your account: `+
      `${activationLink} `
    };

    // Gửi email và đợi cho đến khi quá trình gửi hoàn tất
    let info = await transporter.sendMail(mailOptions);

    // In ra console thông báo về việc gửi email thành công
    console.log('Message sent: %s', info.response);

    // Trả về true để thể hiện rằng email đã được gửi thành công
    return true;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('There was an error sending the email', error);

    // Trả về false để thể hiện rằng có lỗi xảy ra trong quá trình gửi email
    return false;
  }
};

module.exports = sendActivationEmail;