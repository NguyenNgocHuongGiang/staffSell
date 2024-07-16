const User = require('../models/user');
const sendActivationEmail = require('../mailer/activationEmail');

const createUserService = async (userData) =>{
    try{
        const username = userData.email.split('@')[0].toLowerCase();
        if(username == "admin"){
            return { valid: false, message: 'Admin already exists.', code : 0};
        }
        const user = new User(userData);
        if(await checkExist(user.email)){
            return { valid: false, message: 'Email already exists.', code : 0};
        }    
        user.password = username;
        user.fullName = userData.fullname;
        if(await user.save()){
            // return { valid: true, message: `User ${username} created and activation email sent successfully.`, code : 1 };
            const sendMail = await sendActivationEmail(user.email);
            if (sendMail) {
                return { valid: true, message: `User ${username} created and activation email sent successfully.`,code : 1 };
            } else {
                return { valid: false, message: 'User created but failed to send activation email.',code : -1 };
            }
        } else{
            return { valid: false, message: 'Error creating user.', code : -1 };
        }
    }
    catch (error) {
      console.error(error);
      throw error;      
    }
}

const activeUserService = async (email) => {
  try {
    // Tìm user theo email
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { isActive: true } },
      { new: true } // Trả về bản ghi đã được cập nhật
    );
    
    if (!user) {
      console.log('User not found');
      return { valid: false, message: 'User not found.' };
    }

    console.log('User activated:', user);
    return user; // Trả về user sau khi đã được cập nhật
  } catch (error) {
    console.error('Error activating user:', error);
    throw error;
  }
};

const checkLoginService = async (username, password) => {
    try{
        const user = await User.findOne({
            email: new RegExp(`^${username}@`, 'i'),
        })
        if(!user){
            return { valid: false, message: 'User does not exist.' };
        }
        if(await user.checkPassword(password)){
            return { valid: true, message: 'Logged in successfully', user: user};
        }
        else{
            return { valid: false, message: 'Invalid password.' };
        }
    }catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

const getUserService = async () => {
    try{
        return User.find();
    }catch(error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

const getUserbyEmailService = async (email) => {
    try{
        return User.findOne({email: email});
    }catch(error) {
        console.error('Error user:', error);
        throw error;
    }
}

const deleteByEmail = async (email) => {
    try {
        const deletedUser = await User.findOneAndDelete({email : email});
        if (!deletedUser) {
          throw new Error('Not found user.');
        }
        return deletedUser;
      } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
      }
}

const updateUserService = async (user) => {
    try {
        var userUpdate = JSON.parse(user);
        const updateUser = await User.findOneAndUpdate({email : userUpdate.email}, userUpdate);
        if (!updateUser) {
          throw new Error('Not found user.');
        }
        return updateUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
}

const changePasswordService = async (email, password) => {
    try {
        const changePassword = await User.findOneAndUpdate({email : email}, {password: password}, { new: true });
        if (!await changePassword.save()) {
            throw new Error('Not found user.');
        }
        return changePassword;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
}

const changeProfileService = async (user) => {
    try {
        // to do
        return true;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
}

const changeLockUserService = async (email, lockStatus) => {
    try {
        const changeLock = await User.findOneAndUpdate({email : email}, {isLock: lockStatus});
        if (!changeLock) {
            throw new Error('Not found user.');
        }
        return changeLock;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
}

const resendMailService = async (email) => {
    try {
        const user = await User.findOne({email: email})
        if (!user) {
            throw new Error('Not found user.');
        }
        else{
            console.log("Resend mail to "+email);
            if (await sendActivationEmail(email)) {
                return true;
            } else {
                return false;
            }
        }
      } catch (error) {
        console.error('Error resending mail:', error);
        throw error;
      }
}

const confirmFirstLoginService = async(email,newpassword) =>{
    try {
        const confirmFirstLogin = await User.findOneAndUpdate(
            { email: email },
            { password: newpassword, isFirstLogin: false },
            { new: true } // Return the updated document
        );

        if (!await confirmFirstLogin.save()) {
            throw new Error('Not found user.');
        } else {
            return true; // Return true if the update was successful
        }
    } catch (error) {
        console.error('Error confirm first Login:', error);
        throw error;
    }
}

async function  checkExist(email){
    const user = await User.findOne({
        email: email,
    });
    return user;
}

module.exports = {createUserService, activeUserService, checkLoginService, getUserService, deleteByEmail,updateUserService,changeLockUserService, changePasswordService,changeProfileService, resendMailService, confirmFirstLoginService, getUserbyEmailService};