// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// get route to create movies
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
  .then((allCast) => {
    res.render("movies/new-movie", { allCast });
  })
  .catch((err) => console.log(err));
})

//Post to create movie
router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body; 

  Movie.create({ title, genre, plot, cast }) 
  .then((newMovie) => {
    res.redirect("/movies");
  })
  .catch((err) => {
    console.log(err);
    res.render("movies/new-movie");
  });
});

//get route to movie list 
router.get("/movies", (req, res, next) => {
  Movie.find()
  .then((allMovies) => {
    res.render("movies/movies.hbs", { allMovies });
  })
  .catch((err) => console.log(err));
});

//post route for
router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
  .then(() => res.redirect("/movies"))
  .catch((err) => console.log(err));
})

router.post("/movies/:movieId/edit", (req, res, next) => {
  const { title, genre, plot, cast } = req.body; 

  Movie.findByIdAndUpdate(
    req.params.movieId,
    { title, genre, plot, cast }, 
    { new: true }
  )
  .then((updatedMovie) => {
    res.redirect(`/movies/${req.params.movieId}`)
  })
  .catch((err) => console.log(err));
})

router.get("/movies/:theId/edit", (req, res, next) => {
  Movie.findById(req.params.theId)
  .populate("cast")
  .then((editMovie) => {
    Celebrity.find()
    .then((allCelebrities) => {

      allCelebrities.forEach(oneCeleb => {
        editMovie.cast.forEach(oneCastMember => {
          if (oneCeleb._id.equals(oneCastMember._id)){
            oneCeleb.isInCast = true; 
          }
        })
      })
      res.render("movies/edit-movie", { editMovie, allCelebrities });
    })
    .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
})

// GET the movie details
router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movieDetails) => {
      res.render("movies/movie-details", movieDetails);
    })
    .catch((err) => console.log(err));
});

module.exports = router;