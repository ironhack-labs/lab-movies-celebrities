const router = require("express").Router();
const celebrityModel = require('../models/Celebrity.model');
const movieModel = require('../models/Movie.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
// CELEBRITIES.ROUTES
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  celebrityModel.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch((err) => {
      console.log('Failed to create a celebrity', err);
      res.render('celebrities/new-celebrity');
    });
});

router.get('/celebrities', (req, res, next) => {
  celebrityModel.find()
    .then((allCelebrities) => {
      res.render('celebrities/celebrities', { allCelebrities });
    })
    .catch((err) => next(err));
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  celebrityModel.findById(req.params.id)
    .then((updateCelebrity) => {
      res.render('celebrities/update-celebrity', updateCelebrity)
    })
});

router.post('/celebrities/:id/edit', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  celebrityModel.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
    .then((updateCelebrity) => {
      console.log(updateCelebrity)
      res.redirect('/celebrities')
    })
    .catch((err) => next(err));
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  celebrityModel.findByIdAndDelete(req.params.id)
    .then((deleteCelebrity) => {
      console.log(deleteCelebrity)
      res.redirect('/celebrities');
    })
    .catch((err) => next(err));
});

// MOVIES.ROUTES

router.get('/movies/create', (req, res, next) => {
  celebrityModel.find()
    .then((allCelebrities) => {
      res.render('movies/new-movie', { allCelebrities })
    })
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res) => {
  console.log(req.body);
  movieModel.create(req.body)
    .then(() => {
      res.redirect("/movies")
    })
    .catch((err) => next(err));
});

module.exports = router;
