// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require("./movies.routes");

// all your routes here

// register new movie form
router.get("/movies/create", (req, res) => res.render("/views/movies/new-movie.hbs"));

// POST to submit new movie
router.post("/movies/create", (req, res) => {
  const { movie } = req.body;
  Movie.findOne({ movie })
    .then((movieFromDB) => {
      if (!movieFromDB) {
        Movie.create({ movie })
          .then(() => res.redirect("/movie/create"));
      } else {
        res.render("/movies/new-movie", {
          message: "It seems your movie is already registered. ☀️",
        });
        return;
      }
    })
    .catch((err) => console.log(`Error while creating a new movie: ${err}`));
});

// GET to display movies from db
router.get("/movies", (req, res) => {
  Movies.find() //
    .then((moviesFromDB) =>
      res.render("/movies/movies", { movies: moviesFromDB })
    )
    .catch((err) =>
      console.log(`Error while getting movies from the DB: ${err}`)
    );
});

module.exports = router;


