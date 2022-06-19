const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
// all your routes here

router.get("/movies/create", (req, res) => {
  Celebrity.find().then((celebrities) => {
    res.render("movies/new-movie", { celebrities });
  });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  if (!title || !genre || !plot || !cast) {
    return res.redirect("/movies/create");
  }
  Movie.create({ title, genre, plot, cast }).then(() => {
    res.redirect("/movies");
  });
});

router.get("/movies", (req, res) => {
  Movie.find().then((movies) => {
    res.render("movies/movies", { movies });
  });
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => {
      return next(err);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      return next(err);
    });
});

router.get("/movies/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", { movie, celebrities });
  } catch (err) {
    return next(err);
  }
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, plot, genre, cast } = req.body;
  Movie.findByIdAndUpdate(
    id,
    { $set: { title, plot, genre, cast } },
    { new: true }
  )
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;