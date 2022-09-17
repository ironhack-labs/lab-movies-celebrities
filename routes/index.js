const router = require('express').Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// I don´t have to do this, when I do it in app.js? -> Google
/* GET celebrities */
// router.get('/celebrities', (req, res, next) => {
//   res.render('celebrities');
// });

// /* GET movies */
// router.get('/movies', (req, res, next) => {
//   res.render('movies');
// });

module.exports = router;
