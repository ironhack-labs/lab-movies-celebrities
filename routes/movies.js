// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find().then((celebrities) => {
    res.render("movies/new-movie", { celebrities });
  });
});

router.post("/movies/create", (req, res, next) => {
  const { id, title, genre, plot, cast } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .then((result) => {
      console.log("created new movie:", result);
      res.redirect("/movies");
    })
    .catch((err) => {
      res.render("movies/new-movie");
      console.log(err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((result) => {
      res.render("movies/movies", { result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((result) => {
      console.log(result);
      res.render("movies/movie-details", { result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then((result) => {
      console.log("DELETED:", result.title);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/movies");
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((result) => {
      res.render("movies/edit-movie", { result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  }, { new: true })
    .then((result) => {
      console.log("UPDATED movie:", result.title);
      res.redirect("/movies");
    })
    .catch((err) => {
      res.render("movies/edit-movie");
      console.log(err);
    });
});

module.exports = router;
