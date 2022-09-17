const router = require('express').Router();
const { Celebrity } = require('../models/Celebrity.model');

// all your routes here
router.get('/movies/create', async (req, res, next) => {
  Celebrity.find({}, 'name _id').then((data) => {
    console.log(data);
    res.render('movies/new-movie', { celebrities: data });
  });
});

module.exports = router;

// router.get('/celebrities', (req, res, next) => {
//   Celebrity.find().then((data) => {
//     res.render('celebrities/celebrities', { celeb: data });
//   });
// });

// router.get('/celebrities/create', (req, res, next) => {
//   res.render('celebrities/new-celebrity');
// });

// router.post('/celebrities/create', (req, res, next) => {
//   Celebrity.create(req.body)
//     .then(() => {
//       res.redirect('/celebrities');
//       console.log('celeb created!!!');
//     })
//     .catch((err) => {
//       console.log(err);
//       res.redirect('/celebrities/create');
//     });
// });
