const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const router = require("express").Router();

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("movies/new-movie", {celebritiesFromDB});
    })
    .catch((error) => {
      console.log("Error getting books from DB", error);
      next(error);
    });
});

router.post("/movies/create", (req, res, next) => {
    const movieDetails = {
        title: req.body.title,
        cast: [req.body.cast],
        genre: req.body.genre,
        plot: req.body.plot
    };
    Movie.create(movieDetails)
    .then(() => {
        res.redirect("/movies");
    })
})

router.get("/movies", (req, res, next) => {
    Movie.find()
    .populate("celebrity")
    .then((moviesFromDB) => {
        const data = {
            moviesArr: moviesFromDB
        }
        console.log(data)
        res.render("movies/movies", data);
        
    })
})

module.exports = router;
