// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here ------------------
//create a celeb':
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((listOfCeleb) => res.render("movies/new-movie", { listOfCeleb }))
    .catch((err) => {
      console.log(err);
    });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  console.log(req.body);
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => {
      next(err);
      res.render("movies/new-movie");
    });
});

//display all movies:
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((listOfMovies) => res.render("movies/movies.hbs", { listOfMovies }))
    .catch((err) => {
      console.log(err);
    });
});

//display movies details:
router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/movie-details", movie);
    })
    .catch((err) => next(err));
});

//delete a movie
router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

//edit a movie
router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/edit-movie", { movie });
    })
    .catch((err) => next(err));
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  console.log(req.body);
  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect("/movies/:id"))
    .catch((err) => console.log(err));
});

//finally export: -------------------
module.exports = router;
