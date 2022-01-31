const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

//For displaying list of movies
router.get("/movies/movies", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      res.render("movies/movies", { allMovies });
    })
    .catch((error) => {
      console.log(`I guess there is a problem checking the movies -> ${error}`);
      next(error);
    });
});

//Create Movies GET
router.get("/movies/new-movie", (req, res, next) => {
  Celebrity.find()
    .then((allCelebs) => {
      res.render("movies/new-movie", { celebs: allCelebs });
    })
    .catch((error) => {
      console.log(
        `Humm didn't find any stars to display on cast HTML -> ${error}`
      );
      next(error);
    });
});

//Create Movies POST
router.post("/movies/new-movie", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => {
      res.redirect("movies");
    })
    .catch((error) => {
      console.log(`Looks like there's an error creating a movie -> ${error}`);
      next(error);
    });
});

module.exports = router;
