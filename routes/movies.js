// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celeb = require("../models/Celebrity.model");
const Movie = require("../models/Movie");

// get all movies
router.get("/movies", (req, res) => {
  Movie.find()
    .then((allMovies) => {
      res.render("movies/movies", { allMovies });
    })
    .catch((err) => next(err));
});

// render create new movie page
router.get("/movies/create", (req, res, next) => {
  Celeb.find()
    .then((celebs) => {
      res.render("movies/new-movie", { celebs });
    })
    .catch((err) => next(err));
});

/* GET movie details */
router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => next(err));
});

// submit new movie
router.post("/movies", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      res.redirect(`/movies/${newMovie._id}`);
    })
    .catch((err) => next(err));
});

// render edit movie page
router.get("/movies/edit/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/edit-movie", { movie });
    })
    .catch((err) => next(err));
});

//submit edited movie
router.post("/movies/edit/:id", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(
    req.params.id,
    {
      title,
      genre,
      plot,
      cast,
    },
    { new: true }
  )
    .then((data) => {
      console.log("MOVIE UPDATED SUCCESSFULLY!");
      console.log(data);
      // res.send("editing movie!");
      res.redirect(`/movies/${req.params.id}`);
    })
    .catch((err) => {
      console.log("oh no error in editing!");
      console.log(err);
    });
});

// delete movie
router.get("/movies/delete/:id", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("MOVIE WAS DELETED!!!");
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

module.exports = router;
