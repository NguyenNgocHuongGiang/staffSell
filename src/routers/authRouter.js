const express = require("express");
const {activeUser, checkLogin, confirmFirstLogin, changePassword, getUserbyEmail, updateUser} = require('../controllers/userController');

const authRouter = express.Router();

authRouter.get('/activateUser/:token', (req, res) =>{
    if (req.params.token) {
        res.render('activate', { token: req.params.token})
      } else {
        res.redirect(`/activateUser/${req.params.token}`);
      }
})

authRouter.post("/confirmActivation", activeUser)

authRouter.post('/confirmFirstLogin', confirmFirstLogin);

authRouter.put('/changePassword', changePassword);

authRouter.get('/login', (req, res) => {
    if(req.session.user){
        res.redirect('/');
    }else{
        res.render("login");
    }
});

authRouter.get('/profile', (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    }else{
        res.render("profile", {user: req.session.user});
    }
});

authRouter.get('/profile/:email', getUserbyEmail);

authRouter.put('/profile/:email', updateUser);


authRouter.get('/product_user', (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    }
    else if(req.session.user.role === 'ADMIN'){
        res.render("product", {user : req.session.user});
    }
    else{
        res.render("productUser", {user : req.session.user});
    }
});

authRouter.get('/report', (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    }
    res.render("report", {user : req.session.user});
});


authRouter.post('/login', checkLogin);

authRouter.get("/logout", (req,res) => {
    req.session.destroy();
    res.redirect("/login");
})

module.exports = authRouter;