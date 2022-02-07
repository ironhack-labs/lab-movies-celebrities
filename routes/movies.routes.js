const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => res.render("movies/movies-page", { movies }))
    .catch((err) => console.log(err));
});

router.get("/movies/create", (req, res, next) => {
  Celebrity.find().then((celebrities) =>
    res.render("movies/new-movie", { celebrities })
  );
});

router.get("/movies/create", (req, res, next) => {
  res.render("movies/new-movie");
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast }).then(() =>
    res.redirect("/movies")
  );
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/movie-details", movie);
    })
    .catch((e) => console.error(e));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.find().then((celebrities) => {
    return Movie.findById(id)
      .populate("cast")
      .then((movie) => {
        res.render("movies/edit-movie", {
          movie,
          celebrities: celebrities.map((celebrity) => {
            celebrity.selected = movie.cast.some((cast) => {
              return String(celebrity._id) === String(cast._id);
            });
            return celebrity;
          }),
        });
      });
  });
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then(() => res.redirect(`/movies/${id}`))
    .catch((err) => console.log(err));
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

module.exports = router;
