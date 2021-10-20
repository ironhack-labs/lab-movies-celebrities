// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies", (req, res, next) => {
    Movie.find()
        // .populate('author')
        .then( (moviesFromDB) => {
            const data = {
                moviesArr: moviesFromDB
            }
            res.render("movies/movies", data);
        })
        .catch( (error) => {
            console.log("Error getting list of movies from DB", error);
            next(error);
        });
});


router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
      .then((celebritiesFromDB) => {
        const movieData = {
            celebritiesArr: celebritiesFromDB,
            };
      res.render('movies/new-movie', movieData)
      })
      .catch((error) => {
        console.log("Error getting movies from DB", error);
        next(error);
      });
  });
  
  router.post('/movies/create', (req, res, next) => {
  
      const movieTitle = req.body.title;
      const movieGenre = req.body.genre;
      const moviePlot = req.body.plot;
      const movieCast = req.body.cast;
  
      const data = {
          title: movieTitle,
          genre: movieGenre,
          plot: moviePlot,
          cast: movieCast
      }
  
      Movie.create(data)
          .then( () => {
              res.redirect("/movies");
          })
          .catch( (error) => {
              res.render("movies/new-movie", {
              moviesArr: allMovies,
          });
              next(error);
          });
  
  });


module.exports = router;