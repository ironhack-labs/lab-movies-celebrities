const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

// all your routes here

//See all movies

router.get("/movies", (req, res) => {
    MovieModel.find()
    .populate('cast')
    .then((moviesDetails) => {
        const data = {moviesDetails}
        res.render('movies/movies',data)
    })
    .catch((error) => {
        console.log("Error retrieving movies from the database. ", error);
        next(error);
    });
})

//Create movies

router.get("/movies/create", (req, res) => {
    CelebrityModel.find()
    .then((celebritiesDetails) => {
        const data = {celebritiesDetails}
        res.render('movies/new-movie',data)
    })
    .catch((error) => {
        console.log("Error retrieving movies from DB, ", error)
        next(error);
    })

});

router.post("/movies/create", (req, res) => {

    const movieInfo = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    MovieModel.create(movieInfo)
    .then((data) => {
        console.log(data)
        res.redirect("/movies")
    })
    .catch((error) => {
        console.log("Error creating new movie, ", error);
        next(error);
    })
})

router.get("/movies/:movieId", (req, res) => {
    const movieId = req.params.movieId;
  
    MovieModel.findById(movieId)
      .populate("cast")
      .then( (movieDetails) => {
        res.render("movies/movie-details", movieDetails);
      })
      .catch( (error) => {
        console.log("Error getting book details from DB", error);
        next(error);
      })
  
  })
  


module.exports = router;