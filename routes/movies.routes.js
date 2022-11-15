const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movies = require('../models/Movies.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("movies");
});


router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
  .then((celebrities) => {
    res.render("movies/new-movie", celebrities);
  }).catch((error) => {
    console.log(error)
    res.redirect("movies/new-movie")
  })
});

router.post("/movies/create", (req, res, next) => {
  // console.log(req.body);
  const { name, ocupation, catchPhrase } = req.body;

  Movies.create({ name, ocupation, catchPhrase })
    // .then(bookFromDB => console.log(`New book created: ${bookFromDB.title}.`))
    .then(() => res.redirect("/movies/create"))
    .catch((error) => res.redirect("movies/new-movie"));
});
  
router.get("/movies", (req, res, next) => {
  return Movies.find().populate('cast')
    .then((allTheMoviesFromDB) => {
      res.render("movies/movies.hbs", { movies: allTheMoviesFromDB });
    })
    .catch((error) => {
console.log(error)    });
});

module.exports = router;