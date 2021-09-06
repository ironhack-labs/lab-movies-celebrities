// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { get } = require("mongoose");
const Movie = require("./../models/Movie.model");
const Celebrity = require("./../models/Celebrity.model");

// all your routes here
/*const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [ObjectId],
});*/
router.get("/", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/list-movies", { movies });
    })
    .catch((err) => console.log(err));
});

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => console.log(err));
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

router.get("/:movies_id", (req, res) => {
  const { movies_id } = req.params;

  Movie.findById(movies_id)
    .populate("cast")
    .then((theMovie) => res.render("movies/movie-details", theMovie))
    .catch((err) => console.log(err));
});

router.post("/:movies_id/delete", (req, res) => {
  const { movies_id } = req.params;
  Movie.findByIdAndRemove(movies_id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

router.get("/:movies_id/edit", (req, res) => {
  const { movies_id } = req.params;
  Movie.findById(movies_id)
    .then((movies_id) => Celebrity.find())
    .then((celebrities) =>
      res.send("esto es ", movies_id, "esto es celebrities ", celebrities)
    )
    .catch((err) => console.log(err));
});

module.exports = router;
