const router = require("express").Router();

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("movies/new-movie.hbs", { celebrities: celebritiesFromDB });
    })
    .catch((err) =>
      console.log(`Err while displaying movie input page: ${err}`)
    );
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch(() => res.render("movies/new-movie.hbs"));
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render("movies/movies.hbs", {
        movies: moviesFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      next(error);
    });
});

module.exports = router;
