const router = require("express").Router();

const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

router.get("/movies", (req, res, next)=>{
  Movie
    .find()
    .populate("cast")
    .then((moviesFromDB)=>{
      const data= {
        moviesArr: moviesFromDB
      }
      console.log(">>>DATA>>>", moviesFromDB)
      res.render("movies/movies", data)
    })
    .catch( (error) => {
      console.log("Error showing movies from the DB", error);
      next(error);
    });
})

router.get("/movies/create", (req, res, next)=>{
  Celebrity
    .find()
    .then((allCelebrities)=>{
      res.render("movies/new-movie", {castArr : allCelebrities})
      console.log(castArr)
    })

    .catch( (error) => {
      console.log("Error creating a new movie entry in the DB", error);
      next(error);
    });
})

router.post("/movies/create", (req, res, next)=>{
  const {title, genre, plot, cast} = req.body;
  Movie
    .create({title, genre, plot, cast})
    .then(()=>{
      res.redirect("/movies")
    })
    .catch( (error) => {
      console.log("Error creating new movie entry in the DB", error);
      next(error);
    });

})

router.get("/movies/:movieId", (req, res, next) => {
  Movie.findById(req.params.movieId)
      .populate("cast")
      .then( (movieFromDB) => {
        res.render("movies/movie-details", movieFromDB);
      })
      .catch( (error) => {
          console.log("Error getting details for this movie", error);
          next(error);
      });
});

router.post('/movies/:movieId/edit', (req, res, next) => {

  const {title, genre, plot, cast} = req.body;
  const newDetails = {
      title,
      genre,
      plot,
      cast,
  };

  Movie
    .findByIdAndUpdate(req.params.bookId, newDetails, {new: true})
    .then( (movieFromDB) => {
          res.redirect('/movies/' + movieFromDB._id);
    })
    .catch( (error) => {
          console.log("Error updating movie details", error);
          next(error);
    });
});


router.post('/movies/:movieId/delete', (req, res, next) => {
  Movie
    .findByIdAndDelete(req.params.movieId)
    .then( () => {
      res.redirect('/movies');
    })
    .catch( (error) => {
      console.log("Error deleting movie from DB", error);
      next(error);
    });
});


module.exports = router;