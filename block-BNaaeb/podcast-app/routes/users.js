var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/register', function (req, res) {
  res.render('userRegister', { error: req.flash('error')[0] });
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) {
      if (err.code === 11000) {
        req.flash('error', 'This email already exists');
        return res.redirect('/users/register');
      }
      if (err.name === 'ValidationError') {
        req.flash('error', err.message);
        return res.redirect('/users/register');
      }
      return res.json({ err });
    }
    res.redirect('/users/login');
  });
});

router.get('/login', (req, res) => {
  res.render('userLogin', { error: req.flash('error')[0] });
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email/password required');
    return res.redirect('/users/login');
  }
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error', 'user not found, please register');
      return res.redirect('/users/register');
    }
    user.verifyPassword(password, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        req.flash('error', 'Incorrect Password');
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      res.redirect('/userDashboard');
    });
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  // res.clearCookie("connect.sid");
  res.redirect('/');
});
module.exports = router;
