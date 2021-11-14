const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//CREATE
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((data) => res.render("movies/new-movie", { data }))
    .catch((err) => console.log(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.render("index")) //mandar a la página de movies
    .catch(() => res.redirect("/movies/create"));
});

//LIST OF MOVIES
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((data) => res.render("movies/movies", { data }))
    .catch((err) => console.log(err));
});

//MOVIES DETAILS
router.get("/movies/:id", (req, res, next) => {
  //Cómo puedo quitar el id del url?
  const { id } = req.params;

  Movie.findOne({ _id: id })
    .populate("cast")
    .then((data) => res.render("movies/movie-details", { data }))
    .catch((err) => console.log(err));
});

//DELETE MOVIES
router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;

  console.log(id);

  Movie.findByIdAndRemove({ _id: id })
    .then(() => res.render("index")) //mandar a la página de movies
    .catch((err) => console.log(err));
});

//EDIT MOVIES
router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  let celebrities;

  Celebrity.find().then((data) => (celebrities = data));

  Movie.findOne({ _id: id })
    .then((data) => res.render("movies/edit-movie", { data, celebrities }))
    .catch((err) => console.log(err));
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const { id } = req.params;

  Movie.findOneAndUpdate({ _id: id }, { title, genre, plot, cast }, { new: true })
    .then(() => res.render("index")) //mandar a la página de movies-details
    .catch(() => res.redirect("index")); //mandar a la página de detalles de movies
});

module.exports = router;
