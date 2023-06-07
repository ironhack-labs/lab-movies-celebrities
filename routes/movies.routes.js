// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/movie.model");

// all your routes here

// Display the form to create a new movie
router.get("/create", (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a new movie
router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  const newMovie = new Movie({
    title,
    genre,
    plot,
    cast,
  });

  newMovie
    .save()
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});

// retrieves all movies from DB using find(), renders movies if successful
router.get("/", (req, res) => {
    Movie.find()
      .then((movies) => {
        res.render("movies/movies", { movies });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // displaying movie details
  router.get("/movies/:id", (req, res) => {
    const movieId = req.params.id;
  
    Movie.findById(movieId)
      .populate("cast")
      .then((movie) => {
        res.render("movies/movie-details", { movie });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

// deleting specific movie
router.post("/movies/:id/delete", (req, res) => {
    const movieId = req.params.id;
  
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

  // edit
  router.get("/movies/:id/edit", (req, res) => {
    const movieId = req.params.id;
  
    Promise.all([
      Movie.findById(movieId),
      Celebrity.find()
    ])
      .then(([movie, celebrities]) => {
        res.render("movies/edit-movie", { movie, celebrities });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  // find movie by iD
  router.post("/movies/:id", (req, res) => {
    const movieId = req.params.id;
  
    const updatedMovie = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast
    };
  
    Movie.findByIdAndUpdate(movieId, updatedMovie)
      .then(() => {
        res.redirect(`/movies/${movieId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

module.exports = router;
