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

//Display Movie details
router.get("/movies/:id", (req, res, next) => {
  let movieId = req.params.id;

  Movie.findById(movieId)
    .then((movieDetail) => {
      res.render("movies/movie-details", { movieDetail });
    })
    .catch((error) => {
      console.log(`There was an error catching the movie details -> ${error}`);
      next(error);
    });
});

//Delete Movie
router.post("/movies/:id", (req, res, next) => {
  let deletedMovie = req.params.id;

  Movie.findByIdAndDelete(deletedMovie)
    .then((delMovie) => {
      res.redirect("movies");
    })
    .catch((error) => {
      console.log(`It seems that the movie is not deleted -> ${error}`);
      next(error);
    });
});

//Edit Movie
//Get
router.get("/movies/:id/edit", (req, res, next) => {
  let movieId = req.params.id;

  Movie.findById(movieId)
    .then((editedMov) => {
      res.render("movies/edit-movie", { editedMov });
    })
    .catch((error) => {
      console.log(`Error while editing the movie ${error}`);
      next(error);
    });
});

//Post
router.post("/movies/:movieId/edit", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const { movieId } = req.params;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .then((updatedMov) => {
      res.redirect("/movies/movies");
    })
    .catch((error) => {
      console.log(`${error} -> some error editing the movie`);
      res.redirect("movies/movie-details");
      next(error);
    });
});

module.exports = router;
