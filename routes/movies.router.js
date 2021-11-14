const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const { populate } = require("../models/Movie.model");

router.get("/movies", (req, res) => {
  Movie.find()
    .then((allTheMovies) => {
      console.log(allTheMovies);
      res.render("movies/movies", { allTheMovies });
    })
    .catch((err) => console.log(err));
});

router.get("/movies/create", (req, res) => {
  Celebrity.find().then((celebrities) => {
    res.render("movies/new-movie", { celebrities });
  });
});

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  //5. Realizar las operaciones en la BBDD o la lógica de negocio
  Movie.create({ title, genre, plot, cast })
    //6. Decidir que vista vamos a renderizar
    .then((movie) => res.redirect("/movies"))
    .catch((err) => {
      res.render("movies/new-movie");
      console.log(err);
    });
});

router.get("/movies/:id", (req, res) => {
  const movieID = req.params.id;
  Movie.findById(movieID)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movieDetails: movie });
    });
});

router.post("/movies/:id/delete", (req, res) => {
  const movieID = req.params.id;
  Movie.findByIdAndDelete(movieID).then((movie) => {
    res.redirect("/movies");
  });
});

router.get("/movies/:id/edit", (req, res) => {
  const movieID = req.params.id;
  Celebrity.find().then((celebrities) => {
    Movie.findById(movieID)
      .populate("cast")
      .then((movie) => {
        res.render("movies/edit-movie", { celebrities, movie });
      });
  });
});

router.post("/movies/:id", (req, res) => {
  const movieID = req.params.id;
  Movie.findByIdAndUpdate(movieID, req.body).then((movie) => {
    res.redirect("/movies");
  });
});

module.exports = router;
