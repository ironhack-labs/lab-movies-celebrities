const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebs = require("../models/Celebrity.model");

router.get("/movies", (req, res, next) => {
  Movie.find().then((movieArr) => {
    res.render("movies/movies", { movies: movieArr });
  });
});

router.get("/create", (req, res, next) => {
  Celebs.find()
    .then((celebArr) => {
      res.render("movies/new-movie", { celebs: celebArr });
    })
    .catch((err) => consolelog("Error finding celebs", err));
});

router.post("/create", (req, res, next) => {
  const movieDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.create(movieDetails)
    .then((celeb) => {
      res.redirect("/movies/movies");
    })
    .catch((err) => res.render("movies/new-movie"));
});

router.get("/:movieId", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate("cast")
    .then((movieId) => {
      res.render("movies/movie-details", { movieId });
    })
    .catch((err) => {
      console.log("error movie id", err);
    });
});



router.get("/:movieId/edit", (req, res, next) => {
    let details = []
        
    Movie
      .findById(req.params.movieId)
      .then((movieId) => {    
        details.push(movieId);
        return Celebs.find();
      })
      .then((celebDetails) => {
        details.push(celebDetails);
        
        let detailsFlat = details.flat();
        console.log(detailsFlat);
        res.render("movies/edit-movie", {detailsFlat: detailsFlat})
      })
      .catch(err => console.log("Error viewing edit  ", err));    
  });
  
  router.post("/:movieId/edit", (req, res, next) => {
    
    const movieId = req.params.movieId
    
    const newDetails = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      rating: req.body.cast,
    };
    Movie
      .findByIdAndUpdate(movieId, newDetails)
      .then(() => {
        res.redirect(`/movies/${movieId}`);
      })
      .catch((err) => console.log("Error updating movie  ", err));
  });

router.post("/:movieId/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .then(() => {
      res.redirect("/movies/movies");
    })
    .catch((err) => {
      console.log("Error deleting movie...", err);
    });
});

module.exports = router;
