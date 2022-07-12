const router    = require("express").Router();
const Movie     = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// CREATE: Render form
router.get("/movies/create", (req, res) => {
    Celebrity.find()
      .then (celebritiesArr => res.render("movies/new-movie", {celebritiesArr}))
      .catch(error          => console.log("Error getting movies from DB", error));
  });
  
// CREATE: Process form
router.post("/movies/create", (req, res) => {
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot:  req.body.plot,
        cast:  req.body.cast
    };
  
Movie.create(movieDetails)
    .then(() => res.redirect("/"))
    .catch((error) => {
      console.log("Error creating movie in the DB", error);
    });
  });

//show all Movies
router.get("/movies", (req, res) => {
    Movie.find()
      .then(movieArr => res.render("movies/movies.hbs", {movieArr}))
      .catch((err)   => console.log("Error getting list of all Movies",err))
  });

router.get("/movies/:movieId", (req, res) => {
Movie.findById(req.params.movieId)
    .populate("cast")
    .then (oneMovie => res.render("movies/movie-details.hbs", {oneMovie}))
    .catch(err      => console.log(err));
  });

router.get("/movies/:movieId/edit", (req, res) => {
    Movie.findById(req.params.movieId)
      .then((oneMovie) => {
        Celebrity.find().then((celebArray) => {
          res.render("movies/edit-movie.hbs", { oneMovie, celebArray });
        });
      })
      .catch(err => console.log(err));
  });

  router.post("/movies/:movieId/edit", (req, res) => {
    const {title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(req.params.movieId,{ title, genre, plot, cast })
      .then((updatedMovie) => res.redirect(`/movies/${updatedMovie._id}`)) // go to the details page to see the updates
      .catch(err           => console.log(err));
  });
  
  
  router.post("/movies/:movieId/delete", (req, res) => {
    const {movieId} = req.params;
    Movie.findByIdAndRemove(movieId)
      .then(()   => res.redirect("/movies"))
      .catch(err => console.log(err));
  });


module.exports = router;