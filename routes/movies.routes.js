const express = require("express");
const MovieModel = require("./../model/movie.model");
const router = express.Router();

/* GET Create new movie  */

router.get("/new", async (req, res, next) => {
  MovieModel.find().then((dbResult) => {
    res.render("movies/new-movie");
  });
});

/* POST - Create new movie */

router.post(
  "/",
  // uploader.single("picture"),
  async (req, res, next) => {
    const NewMovie = { ...req.body };

    // if (!req.file) newMovie.picture = undefined;
    // else newMovie.picture = req.file.path;


    try {
      await MovieModel.create(NewMovie);
      res.redirect("/movies");
    } catch (err) {
      res.render("/movies/new-movie");
    }
  }
);

/* Iteration #6 Listing movies
GET Movie Route. */ 
router.get("/", (req, res, next) => {
  MovieModel.find()
    .then((dbResult) => {
      res.render("movies/movies", { Movie: dbResult });
    })
    .catch((dbErr) => next(dbErr));
});




module.exports = router; 