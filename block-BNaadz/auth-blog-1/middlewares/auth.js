var Register = require('../models/Register');

module.exports = {
  loggedInRegister: (req, res, next) => {
    if (req.session && req.session.registerId) {
      next();
    } else {
      res.redirect('/register/login');
    }
  },
  registerInfo: (req, res, next) => {
    var registerId = req.session && req.session.registerId;
    if (registerId) {
      Register.findById(registerId, 'firstName lastName email', (err, user) => {
        if (err) return next(err);
        req.user = user;
        res.locals.user = user;
        next();
      });
    } else {
      req.user = null;
      res.locals.user = null;
      next();
    }
  },
};
