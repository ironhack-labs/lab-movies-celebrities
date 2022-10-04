const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

//READ: List of all books
router.get("/movies", (req, res, next) => {
    Movie.find()
    .populate("celebrity")
      .then( moviesFromDB => {
          res.render("movies/movies", {movies: moviesFromDB})
      })
      .catch( err => {
          console.log("error getting movies from DB", err);
          next();
      })
  });


  //CREATE: display form
router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then((celebArr) => {
        res.render("movies/new-movie", {celebArr});
    })
    .catch(err => {
        console.log("error getting celebrities from DB", err);
        next(err);
      })
})

router.get("/movies/:movieId", (req, res, next) => {
    const id = req.params.movieId;

    Movie.findById(id)
    .populate("celebrity")
    .then(movieDetails => {
        res.render("movies/movie-details", movieDetails)
    })
    .catch( err => {
        console.log("error getting movies details fom DB", err);
        next();
    })
});

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
  const moviesDetails = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
  }

  Movie.create(moviesDetails)
  .then( moviesDetails => {
      res.redirect("/movies")
  })
  .catch(err => {
      console.log("error creating new movie in DB", err);
      next();
  })

})

 //DELETE
 router.post("/movies/:movieId/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.movieId)
      .then(() => {
        res.redirect("/movies");
      })
      .catch(err => {
        console.log("Error deleting movie...", err);
        next();
      });
  
  });



module.exports = router;