// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((dbMovie) => {
      res.render("movies/new-movie", { dbMovie });
    })
    .catch((err) =>
      console.log(`Err while displaying movie input page: ${err}`)
    );
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  // 'cast' represents the ID of the celebrity document

  Movie.create({ title, genre, plot, cast })
    .then((dbMovie) => {
      // when the new movie is created, the cast needs to be found and its movies updated with the
      // ID of newly created movie
      return Celebrity.findByIdAndUpdate(cast, {
        $push: { movies: dbMovie._id },
      });
    })
    .then(() => res.redirect("movies")) // if everything is fine, redirect to list of posts
    .catch((err) => {
      console.log(`Err while creating the movie in the DB: ${err}`);
      next(err);
    });
});

router.get("/movies/movies", (req, res, next) => {
  res.render("movies/movies");
});

module.exports = router;
