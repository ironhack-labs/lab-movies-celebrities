// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
// all your routes here

router.get("/movies/create", (req, res) => {
  // Iteración 6, añadiendo nueva película
  res.render("movies/new-movie");
});

router.post("/movies/create", (req, res) => {
  console.log(req.body);
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      console.log(newMovie);
      res.redirect("/movies");
    })
    .catch((error) => res.render("/movies/new-movie"));
});

router.get("/movies", (req, res) => {
  Movie.find()
    .then((moviesFromDb) => {
      // console.log(moviesFromDb);
      res.render("movies/movies", { movie: moviesFromDb });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      next(error);
    });

    router.get("/movies/:id", (req, res) => {
      const { id } = req.params
    
      Movie.findById(id)
        .populate("cast")
        .then((thisMovie) => {
          // res.send(thisMovie)
          res.render("movies/movie-details", thisMovie)
        })
        .catch((error) => {
          console.log(error)
        })
    })

    router.post("/movies/:id/delete", (req, res) => {
      Movie.findByIdAndRemove(req.params.id)
        .then(() => {
          res.redirect("/movies")
        })
    
        .catch((error) => {
          console.log(error)
        })
    })
    
});

module.exports = router;
