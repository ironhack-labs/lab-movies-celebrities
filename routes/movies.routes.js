// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => res.render("movies/new-movie", { celebrities }))
    .catch((err) => console.log(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((allmovies) => {
      // Luego lo referenciamos asi en el hbs
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movie) => res.render("movies/movies", { movie }))
    .catch((err) => console.log(err));
});

router.get("/movies/details/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movies) => {
      res.render("movies/movie-details", movies);
    })
    .catch((err) => console.log(err));
});

router.get("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch(() => res.render("not-found"));
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      Celebrity.find()
        .then((celebs) => res.render("movies/edit-movie", { movie, celebs }))
        .catch((err) => console.log(err));
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { _id, title, genre, cast } = req.body;

  Movie.findByIdAndUpdate(id).then((movie) => {
    Celebrity.find()
      .then(() => res.redirect("movies/:id", { _id, title, genre, cast }))
      .catch((err) => console.log(err));
  });
});

module.exports = router;
