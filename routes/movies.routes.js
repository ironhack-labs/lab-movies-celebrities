// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require Movie model in order to use it
const Movie = require("../models/Movie.model");

// all your routes here
router.get("/movies", (req, res, next) => {
  const movieArr = Movie.find().then((movieArr) => {
    res.render("movies/movies", { movieArr });
  });
});

router.get("/movies/create", (req, res, next) => {
  res.render("movies/new-movie");
});

router.post("/movies/create", (req, res, next) => {
  const { movie, genre, plot, cast } = req.body;
  Movie.findOne({ movie, genre, plot })
    .then((movieDocFromDB) => {
      if (!movieDocFromDB) {
        // prettier-ignore
        console.log(movieDocFromDB);

        Movie.create({ movie, genre, plot, cast }).then(() =>
          res.redirect("/movies")
        );
      } else {
        console.log(movieDocFromDB);
        res.render("movies/new-movie", {
          message: "It seems that movie is already in our database. ☀️",
        });
        return;
      }
    })
    .catch((err) => console.log(`Error while creating a new movie: ${err}`));
});

module.exports = router;
