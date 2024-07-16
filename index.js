const dotenv = require("dotenv") ;
const express = require("express") ;
const rateLimit = require('express-rate-limit');
const csurf = require('csurf');

const { dbConnected } = require('./src/config/db');
const config = require('./src/config/config');
const {checkAdmin, checkAuth} = require('./src/checkVaildUser');

const app = express();

//Connect to db
dbConnected();

const user = require('./src/models/user');

//Set view engine
app.set('views', './views');
app.set('view engine', 'ejs');

dotenv.config();

app.use(express.static("."))
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('cookie-parser')(config.secret_session))
app.use(require('express-session')(config.secret_session))


const apiLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})


//Security
app.use('/', apiLimiter)
app.use(csurf({ cookie: true }));

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

//render index page
app.get('/', checkAuth, async (req, res) => {
  if(req.session.user.role === "ADMIN"){
    res.render('staff', {user : req.session.user});
  }
  else{
    res.render('sale', {user : req.session.user});
  }
});

//Router
const userRouter = require('./src/routers/userRouter');
const authRouter = require('./src/routers/authRouter');
const productRouter = require('./src/routers/productRouter');
const customerRouter = require("./src/routers/customerRouter");
const orderRouter = require("./src/routers/orderRouter");

app.use('/', authRouter);
app.use('/user', checkAdmin, checkAuth, userRouter);
app.use('/product', checkAuth, productRouter);
app.use('/customer', checkAuth, customerRouter);
app.use('/order', checkAuth, orderRouter);


//Catch error 500
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500');
  });

//Catch error 404
app.use((req, res) => {
  res.status(404)
  res.render('404');
});


app.listen(config.port, () => {
  console.log(`Server đang lắng nghe tại: ${config.host}`);
});
    
