const checkAuth = (req, res, next) => {
  if (req.session.user) {
    if(req.session.user.role === 'ADMIN'){
      return next();
    }
    if (!req.session.user.isActive) {
      req.session.destroy();
      return res.render('inActive');
    }
    else if(req.session.user.isFirstLogin){
      return res.send("Vui lòng đăng nhập bằng cách nhấp vào liên kết trong email của bạn");
    }
    else if(req.session.user.isLock){
      req.session.destroy();
      return res.render('inActive');
    }
    return next();
  } else {
    res.redirect('/login');
  }
};

const checkAdmin = (req, res, next) => {
  if(req.session.user.role !== 'ADMIN'){
      return res.render("404");
  }
  return next();
};

module.exports = {checkAdmin, checkAuth};