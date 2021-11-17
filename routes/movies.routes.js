const router = require("express").Router();
const Movie = require("./../models/Movie.model");
const Celebrity = require("./../models/Celebrity.model");

/* GET home page */
router.get("/movies", (req, res) => {
  const data = Movie.find()
    .then((data) => res.render("movies/movies", { data }))
    .catch((error) => console.error(error));
});

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((data) => res.render("movies/new-movie", { data }))
    .catch((error) => console.error(error));
});

router.post("/movies/create", (req, res) => {
  const { name, genre, plot, cast } = req.body;
  console.log(name, genre, plot, cast);

  Movie.create({ name, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch(() => {
      res.redirect("/movies/create");
    });
});

router.get("/movies/movie-details/:id", (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    //.populate("cast")
    .then((data) => {
      console.log(data);
      res.render("movies/movie-details", { data });
    })
    .catch((err) => console.log(err));
});

router.get("/edit-movie", (req, res, next) => {
  res.render("edit-movie");
});

module.exports = router;
