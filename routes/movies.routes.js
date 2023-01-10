const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here
router.get("/movies/create", (req, res) => {
  console.log(res.render);
  Celebrity.find()
    /* .populate("cast") */
    .then((result) => {
      res.render("movies/new-movie", { result });
    });
});

router.post("/movies/create", (req, res) => {
  console.log(req.body);
  const { title, genre, cast, plot } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error while creating movies:", err);
      res.redirect("/movies/new-movie");
    });
});

router.get("/movies", (req, res) => {
  console.log(res.render);
  Movie.find()
    .then((result) => {
      res.render("movies/movies", { result });
    })
    .catch((err) => {
      console.log("Error on the movies list", err);
    });
});

router.get("/movies/:movieId", (req, res) => {
  console.log(req.params);
  Movie.findById(req.params.movieId)
    .populate("cast")
    .then((result) => {
      console.log(result);
      res.render("movies/movie-details", result);
    })
    .catch((err) => {
      console.log("Error in accessing movie details", err);
    });
});

router.post("/movies/:movieId/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error in deleting movie", err);
    });
});

router.get("/movies/:editId/edit", (req, res) => {
  let allCelebrities = [];
  Celebrity.find().then((result) => {
    allCelebrities = result;
  });
  Movie.findById(req.params.editId).then((result) => {
    res.render("movies/edit-movie", { result, allCelebrities });
  });
});

module.exports = router;
