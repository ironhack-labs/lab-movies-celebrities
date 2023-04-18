// starter code in both routes/movies.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    res.render("error", { error });
  }
});
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((dbCelebrities) => {
      res.render("movies/new-movie", { dbCelebrities });
    })
    .catch((error) => res.render("error", { error }));
});

router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { movie });
  } catch (error) {
    res.render("error", { error });
  }
});

router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findById(id).populate("cast");
  try {
    res.render("movies/edit-movie", { movie });
  } catch {
    (error) => {
      res.render("error", { error });
    };
  }
});

router.post("/:id/edit", async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  try {
    await Movie.findByIdAndUpdate(id, body);
    res.redirect("/movies");
  } catch {
    (error) => {
      res.render("error", { error });
    };
  }
});

router.post("/create", async (req, res, next) => {
  const { body } = req;
  try {
    const movie = await Movie.create(body);
    res.redirect("/");
  } catch (error) {
    res.render("error", { error });
  }
});

router.post("/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.redirect("/");
  } catch {
    (error) => {
      res.render("error", { error });
    };
  }
});

module.exports = router;
