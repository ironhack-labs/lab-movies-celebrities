const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

/* GET */

//List of all movies
router.get("/movies", (req, res, next) => {
  return Movie.find()
    .then((allMoviesFromDB) => {
      res.render("movies/movies.hbs", { movies: allMoviesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      next("/movies");
    });
});

//Create - movie form
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie.hbs", { allCelebrities })
    })
    .catch(error => next(error));
});

//Edit a movie - receiving the movie form
router.get("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate('cast')
    .then((theMovie) => {
      Celebrity.find()
        .then(celebrities => {
          res.render("movies/edit-movie.hbs", { movie: theMovie, celebrities })
        })
    })
    .catch((error) => {
      console.log("Error while retrieving movie id details: ", error);
      next(error);
    });
});

//movie details
router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("cast")
    .then(movie => {
      res.render("movies/movie-details.hbs", { movie })
    })
    .catch(error => next(error));
});


/* POST */

//create new movie - sending the form
router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => next("movies/new-movie"));
});

//edit a movie - updating the movie
router.post("/movies/:movieId/edit", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const { movieId } = req.params;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then((updatedMovie) => {
      res.redirect(`/movies/${updatedMovie._id}`)
    })
    .catch(error => next(error));
})







//Delete a movie
router.post('/movies/:movieId/delete', (req, res) => {
  const { movieId } = req.params;
  Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect('/movies'))
    .catch(error => {
      console.log("Error while deleting movie from the DB: ", error);
    })
})



module.exports = router;
