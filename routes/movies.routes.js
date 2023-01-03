const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

router.get('/movies', (req, res, next) => {
    MovieModel.find()
    .then((moviesFromDB) => {
        res.render('movies/movies', { movies: moviesFromDB });
    })
    .catch((err) => {
        console.log("Error getting movies from DB", err);
        next();
})
})


router.get("/movies/create", (req, res, next) => {
  let celebritiesArray;

  CelebrityModel.find()
    .then((celebritiesFromDB) => {
      celebritiesArray = celebritiesFromDB;

      return MovieModel.findById(req.params.movieId);
    })
    .then((movieDetails) => {
      const data = {
        movieDetails: movieDetails,
        celebritiesArray: celebritiesArray,
      };

      res.render("movies/new-movie", data);
    })
    .catch((err) => {
      console.log("Error creating movie", err);
      next();
    });
});

router.post("/movies/create", (req, res, next) => {
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }

    MovieModel.create(movieDetails)
    .then(movieDetails => {
        console.log(movieDetails);
        res.redirect('/movies')
    })
    .catch((err) => {
        res.render('/movies/new-movie')
    })
})


router.get("/movies/:movieId/", (req, res, next) => {
    const id = req.params.movieId;
    MovieModel.findById(id)
    .populate("cast")
      .then( movieDetails => {
          res.render("movies/movie-details", movieDetails)
      })
      .catch( err => {
          console.log("error getting movie details from DB", err);
          next();
      })
  });

  router.post('/movies/:movieId/delete', (req, res, next) => {
    MovieModel.findByIdAndDelete(req.params.movieId)
    .then(() => {
        res.redirect("/movies")
    })
    .catch(err => {
        console.log("error deleting movie...", err);
    })
  })
module.exports = router;
