// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//Middleware
function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  // next invocation tells Express that the middleware has done all it work
  else res.redirect("/auth/login");
}

// all your routes here

//CREATE MOVIEWS
router.get("/new-movie", isLoggedIn, (req, res) => {
  Celebrity.find()
    .then((celebs) => {
      res.render("movies/new-movie", { celebs: celebs });
    })
    .catch((err) => console.log(err));
});

router.post("/new-movie", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => res.redirect("/movies"))
    .catch((err) => res.redirect("/movies/new-movie"));
});

//DELETE MOVIEWS
router.post("/:id/delete", isLoggedIn, (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndRemove(id)
    .then((deletedMovie) => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

//EDIT MOVIES
router.get("/:id/edit", isLoggedIn, (req, res) => {
  const id = req.params.id;

  Movie.findById(id)
    .then((movie) => {
      Celebrity.find()
        .then((celebs) => {
          res.render("movies/edit-movie", { movie: movie, celebs: celebs });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/:id/edit", (req, res) => {
  const id = req.params.id;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

//MOVIE DETAILS
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie: movie });
    })
    .catch((err) => console.log(err));
});

//DISPLAY ALL MOVIES
router.get("/", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
