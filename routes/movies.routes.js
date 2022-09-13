const { Router } = require("express");
const app = require("../app");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
//------------------------------------------- CREATE MOVIES ROUTES
router.get("/create", (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => console.log(err));
});
router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  let errors = [];

  const newMovie = new Movie({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  });

  console.log(req.body);

  //CHECK FOR ERRORS
  if (!title || !genre || !plot || !cast) {
    errors.push({ msg: "All fields are required" });
  }

  //HANDLE ROUTE
  if (errors.length > 0) {
    Celebrity.find()
      .then((celebrities) => {
        res.render("movies/new-movie", {
          celebrities,
          errors,
          title,
          genre,
          plot,
        });
      })
      .catch((err) => console.log(err));
  } else {
    newMovie
      .save()
      .then((movie) => {
        console.log(movie);
        // res.redirect("/movies/movies");
        res.redirect("/movies/movies");
      })
      .catch((err) => {
        console.log(err);
        // res.redirect("/movies/movies");
        res.redirect("/movies/create");
      });
  }
});

//------------------------------------------- DISPLAY MOVIES ROUTE
router.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});

//------------------------------------------- DISPLAY MOVIE DETAILS ROUTE
router.get("/:id", (req, res) => {
  Movie.findOne({ _id: req.params.id })
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => console.log(err));
});

//------------------------------------------- DELETE MOVIE ROUTE
router.post("/:id/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(res.redirect(req.baseUrl + "/movies"))
    .catch((err) => console.log(err));
});

//------------------------------------------- EDIT MOVIE ROUTES
router.get("/:id/edit", (req, res) => {
  Movie.findOne({ _id: req.params.id })
    .populate("cast")
    .then((movie) => {
      Celebrity.find()
        .then((celebrities) => {
          console.log(movie);
          res.render("movies/edit-movie", { movie, celebrities });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.lot(err));
});

//////////////////////////////////////////////////////
router.post("/:id", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  const newMovie = {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  };

  Movie.findByIdAndUpdate(`${req.params.id}`, newMovie)
    .then(res.redirect(req.baseUrl + "/movies"))
    .catch((err) => console.log(err));
});

module.exports = router;
