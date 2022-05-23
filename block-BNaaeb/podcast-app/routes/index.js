var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/userDashboard', auth.loggedInUser, (req, res) => {
  res.render('userDashboard');
});

router.get('/adminDashboard', auth.loggedInAdmin, (req, res) => {
  res.render('adminDashboard');
});

module.exports = router;
