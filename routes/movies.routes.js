// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Celebrity.model");
const Celebrity = require("../models/Movie.model");

// all your routes here

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error retrieving celebrities from database");
    });
});


router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  const newMovie = new Movie({ title, genre, plot, cast });

  newMovie
    .save()
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error adding new movie to database");
    });
});


router.get("/", (req, res, next) => {
  Movie.find()
    .populate("cast", "name") 
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error retrieving movies from database");
    });
});



module.exports = router;


