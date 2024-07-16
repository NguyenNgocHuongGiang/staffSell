const express = require("express");
const {createUser,getUsers,deleteUser,updateUser,changeLockUser, getUserbyEmail, resendMail} = require('../controllers/userController');


const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:email', getUserbyEmail);
userRouter.post('/create', createUser);
userRouter.delete('/delete', deleteUser);
userRouter.put('/update', updateUser);
userRouter.post('/resend', resendMail);
userRouter.put('/changeLock', changeLockUser);


module.exports = userRouter;