const router = require("express").Router();

// router.get("/movies", (request, response) => {
//   response.render("movies/movies.hbs");
// });

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");
// all your routes here

router.get("/movies/create", (req, res) => res.render("movies/new-movie.hbs"));

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((movieFromDB) => res.redirect("/movies"))
    .catch((error) => {
      // If there's an error, render the form again with an error message
      res.render("movies/new-movie", { error: "Error creating movie." });
    });
});

router.get('/movies', (req, res) => {
  Movie.find()
    .populate()
    .then((movieFromDB) => {
      console.log("Movie from DB:", movieFromDB);
      res.render("movies/movies", { movie: movieFromDB });
    })
    .catch((err) => {
      console.log(`Err while getting the celebrity from the DB: ${err}`);
      next(err);
    });
});


module.exports = router;
