const {createUserService, activeUserService, checkLoginService, getUserService, deleteByEmail,updateUserService,changeLockUserService, changePasswordService, resendMailService,confirmFirstLoginService, getUserbyEmailService} = require('../services/userService');
const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config");
const createUser = async (req,res) =>{
    try{
        const user = req.body;
        const signUp = await createUserService(user);
        if(signUp.valid){
            console.log(signUp.message);
            res.json({code: signUp.code, message: signUp.message});
        }
        else{
            console.log(signUp.message);
            res.json({code: signUp.code, message: signUp.message});
        }
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}
const activeUser = async (req,res) =>{
    try {
        const token = req.body.token;
        const decoded = jsonwebtoken.verify(token, config.secret_key);

        if(decoded.email){
            return res.render("firstLogin",{warning:"",email: decoded.email});
        }
        else{
            return res.render('404');
        }
    }catch (error) {
        return res.render('tokenTimeOut');
    }
}

const checkLogin = async (req,res) =>{
    const { username, password } = req.body;
    const result = await checkLoginService(username,password);
    if(result.valid){
        req.session.user = result.user;
        console.log(result.message)
        res.redirect('/');
    }
    else{
        console.log(result.message)
        res.redirect('/login');
    }
}

const confirmFirstLogin = async (req,res) =>{
    const { email, password, passwordConfirm } = req.body;
    if(!password.trim() || !passwordConfirm.trim()){
        res.render('firstLogin',{warning: "Vui lòng nhập đủ thông tin!"});
    }
    else if(password != passwordConfirm){
        res.render('firstLogin',{warning: "Xác nhận mật khẩu không đúng!"});
    }
    else{
        if(await confirmFirstLoginService(email, password)){
            if(await activeUserService(email)){
                req.session.destroy();
                res.redirect('/');
            } 
        }
        else{
            res.render('firstLogin');
        }
    }
}

const updateUser = async (req,res) =>{
    res.json(await updateUserService(req.body.user));
}
const getUsers = async (req,res) =>{
    const listUser = await getUserService();
    res.json(listUser);
}

const getUserbyEmail = async (req,res) =>{
    const user = await getUserbyEmailService(req.params.email);
    res.json(user);
}

const deleteUser = async (req,res) =>{
    res.json(await deleteByEmail(req.query.email));
}

const changeLockUser = async (req,res) =>{
    res.json(await changeLockUserService(req.body.email , req.body.lockStatus));
}

const resendMail = async (req,res) =>{
    res.json(await resendMailService(req.body.email));
}

const changePassword = async (req,res) =>{
    if(await changePasswordService(req.session.user.email , req.body.password)){
        req.session.destroy();
        res.json(true);
    }
    else{
        res.json(false);
    }
}


module.exports = {createUser,activeUser, checkLogin, getUsers, deleteUser,updateUser, changeLockUser, changePassword, resendMail, confirmFirstLogin,getUserbyEmail};