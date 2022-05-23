const { renderFile } = require('ejs');

module.exports = {
  loggedInUser: (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.redirect('/users/login');
    }
  },
  loggedInAdmin: (req, res, next) => {
    if (req.session && req.session.adminId) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  },
};
