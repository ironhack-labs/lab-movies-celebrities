const router = require('express').Router();
const { Celebrity } = require('../models/Celebrity.model');

// Iteration #3
// Show celebrities form
router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});

// Create  celebrities
router.post('/celebrities/create', (req, res, next) => {
  Celebrity.create(req.body)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/celebrities/create');
    });
});

// Iteration #4
// Listing all celebrities
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((data) => {
      res.render('celebrities/celebrities', { celebrity: data });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/celebrities/create');
    });
});

// #############################################################################
// Iteration 11
// Celebrity detail page
router.get('/celebrities/:id', (req, res, next) => {
  console.log(req.params.id);
  Celebrity.findById(req.params.id)
    .then((data) => {
      res.render('celebrities/celebrity-detail', { celebrity: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Iteration 12
// Delete celebrities
router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log(err);
    });
});

// Iteration 13
// Edit celebrities
router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((data) => {
      res.render('celebrities/edit-celebrity', { celebrity: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/celebrities/:id', (req, res, next) => {
  Celebrity.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
