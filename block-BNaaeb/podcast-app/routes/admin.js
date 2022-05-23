var express = require('express');
var router = express.Router();
let Admin = require('../models/admin');

// render admin registeration page
router.get('/register', (req, res, next) => {
  res.render('adminRegister', { error: req.flash('error')[0] });
});

//creating admin registration details in database
router.post('/register', (req, res, next) => {
  Admin.create(req.body, (err, user) => {
    if (err) {
      if (err.code === 11000) {
        req.flash('error', 'This email already exists');
        return res.redirect('/admin/register');
      }
      if (err.name === 'ValidationError') {
        req.flash('error', err.message);
        return res.redirect('/admin/register');
      }
      return res.json({ err });
    }
    res.redirect('/admin/login');
  });
});

//render admin login
router.get('/login', (req, res, next) => {
  res.render('adminLogin', { error: req.flash('error')[0] });
});

//authentication while login
router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email/password Required');
    return res.redirect('/admin/login');
  }
  Admin.findOne({ email: email }, (err, admin) => {
    if (err) {
      return next(err);
    }
    if (!admin) {
      req.flash('error', 'admin not found!! Kindly register first');
      return res.redirect('/admin/register');
    }
    admin.verifyPassword(password, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        req.flash('error', 'Incorrect Password');
        return res.redirect('/admin/login');
      }

      req.session.adminId = admin.id;
      res.redirect('/adminDashboard');
    });
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  // res.clearCookie("connect.sid");
  res.redirect('/');
});

module.exports = router;
