// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// /movies/create	GET	Show a form to create a movie
router.get("/create", (req, res) => {
  Celebrity.find()
    .then((dbCelebrity) => {
      //console.log(dbCelebrity);
      res.render("movies/new-movie.hbs", { dbCelebrity });
    })
    .catch((err) =>
      console.log(`Err while displaying post input page: ${err}`)
    );
});
// /movies/create	POST	Send the data from the form to this route to create the movie

router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  let movie;
  //create an instance of the movie model
  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => {
      //console.log(movie);
      movie = createdMovie;
      return Movie.findByIdAndUpdate(createdMovie._id, {
        $push: { cast: cast },
      });
    })
    .then(() => res.render("movies/movies.hbs", { movie }))
    .catch((err) => {
      res.render("movies/new-movie.hbs");
      next(err);
    });
});

///movies	GET	Show all movies
router.get("/movies", (req, res) => {
  Movie.find()
    .then((movie) => {
      res.render("movies/movies.hbs", { movie });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
