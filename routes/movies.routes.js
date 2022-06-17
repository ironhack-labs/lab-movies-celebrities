const router = require("express").Router();
const Movies = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

//Create movies
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log("las celebridades: ", celebrities);
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => {
      console.log("error creating movie", err);
      next();
    });
});

router.post("/create", (req, res, next) => {
  const movies = req.body; // con el req.body necesitas pasarlo así.
  Movies.create(movies)
    .then((movies) => {
      console.log("create success", movies);
      res.redirect("/movies/movies")
    })
    .catch((err) => {
      console.log("error creating movie", err);
      next();
    });
});

//list movies

router.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      console.log("all the movies",movies)
      res.render("movies/movies", {movies});
    })
    .catch((err) => {
      console.log("error getting movies", err);
      next();
    });
});

module.exports = router;
