var express = require('express');
var router = express.Router();
var Podcast = require('../models/podcast');
var auth = require('../middlewares/auth');

//render all products
router.get('/', (req, res, next) => {
  Podcast.find({}, (err, podcasts) => {
    if (err) {
      return next(err);
    }
    res.render('podcasts', { podcasts });
  });
});

//page for creating product
router.get('/new', auth.loggedInAdmin, (req, res, next) => {
  res.render('addPodcast');
});

//create product with details and save it in DB
router.post('/new', auth.loggedInAdmin, (req, res, next) => {
  Podcast.create(req.body, (err, product) => {
    console.log(req.body);
    if (err) {
      return next(err);
    }
    res.redirect('/podcasts');
  });
});

// fetch only one podcast

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Podcast.findById(id, (err, podcast) => {
    if (err) return next(err);
    res.render('podcastDetail', { podcast });
  });
});

router.use(auth.loggedInAdmin);

// Update podcast form
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Podcast.findById(id, (err, podcast) => {
    if (err) return next(err);
    res.render('editPodcast', { podcast });
  });
});

// update article
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Podcast.findById(id, (err, podcast) => {
    if (err) return next(err);

    Podcast.findByIdAndUpdate(id, req.body, (err, updatePodcast) => {
      if (err) return next(err);
      res.redirect('/podcasts/' + id);
    });
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Podcast.findByIdAndDelete(id, (err, podcast) => {
    if (err) return next(err);
    res.redirect('/podcasts');
  });
});

module.exports = router;
