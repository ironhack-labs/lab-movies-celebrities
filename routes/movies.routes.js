// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie", { allCelebrities });
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log(req.body);
  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => res.redirect("/movies"))
    .catch((error) => res.render("movies/new-movie"));
});

router.get("/", (req, res) => {
  Movie.find()
    .then((allMovies) => {
      console.log(allMovies);
      res.render("movies/movies", { allmovies: allMovies });
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((oneMovie) => {
      console.log(oneMovie);
      res.render("movies/movie-details", { oneMovie });
    })
    .catch((error) => {
      console.log("error displaying movie details!!");
    });
});

router.post("/:id/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/");
    });
});

router.get("/:id/edit"),
  (req, res) => {
    Movie.findById(req.params.id)
      .populate("cast")
      .then((oneMovie) => {
        Celebrity.find().then((allCelebrities) => {
          res.render("movies/edit-movie", { oneMovie, allCelebrities });
        });
      });
  };

router.post("/:id/edit", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMovie) => res.redirect(`/movies/${updatedMovie.id}`))
    .catch((error) => next(error));
});

module.exports = router;
