const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

//create
router.get("/crear", (req, res, next) => {
  Celebrity.find().then((actor) => res.render("./movies/new-movie", { actor }));
});

router.post("/crear", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/peliculas"))
    .catch((err) => console.log(err));
});

//list

router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => res.render("movies/movies", { movies }))
    .catch((err) => console.log(err));
});

//detail

router.get("/detalles/:_id", (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .populate("cast")
    .then((movies) => res.render("./movies/movie-details", movies));
});

//delete

router.post("/detalles/:_id/eliminar", (req, res, next) => {
  const { _id } = req.params;

  Movie.findByIdAndRemove(_id)
    .then(() => res.redirect("/peliculas"))
    .catch((err) => console.log(err));
});

//edit

router.get("/detalles/:_id/editar", (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .then((movie) => {
      Celebrity.find()
        .then((actor) => {
          res.render("./movies/edit-movie", { movie, actor });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/detalles/:_id/editar", (req, res, next) => {
  const { _id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(
    _id,
    { title, genre, plot, cast },
    { new: true }
  ).then((movie) => {
    // Celebrity.findById(cast)
    //   .then(() => {
    res.redirect("/peliculas");
    // })
    // .catch((err) => console.log(err));
  });
});

//exports
module.exports = router;
