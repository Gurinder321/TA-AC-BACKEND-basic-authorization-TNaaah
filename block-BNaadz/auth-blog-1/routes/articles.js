var express = require('express');
const Article = require('../models/article');
var router = express.Router();
var auth = require('../middlewares/auth');

// render all products
router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) {
      return next(err);
    }
    res.render('allArticles', { articles });
  });
});

router.get('/new', auth.loggedInUser, (req, res, next) => {
  res.render('addArticle');
});

// fetch only one article
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id).exec((err, article) => {
    if (err) return next(err);
    res.render('articleDetail', { article });
  });
});

router.use(auth.loggedInUser);

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('editArticle', { article });
  });
});

// create project

//create product with details and save it in DB
router.post('/new', (req, res, next) => {
  Article.create(req.body, (err, article) => {
    console.log(req.body);
    if (err) {
      return next(err);
    }
    res.redirect('/articles');
  });
});

// update article
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, updateArticle) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

module.exports = router;
