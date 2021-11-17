const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

/*CREATE*/

router.get("/movies/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find({});
    res.render("movies/new-movie", { celebrities });
  } catch (err) {
    console.log("err", err);
  }
});

router.post("/movies/create", async (req, res, next) => {
  try {
    await Movie.create(req.body);
    res.redirect("/movies");
  } catch (err) {
    res.render("/movies/create");
    console.log("err", err);
  }
});
/*LIST*/

router.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.render("movies/movies", { movies });
  } catch (err) {
    console.log("err", err);
  }
});

/*INFO*/

router.get("/movies/:id", async (req, res, next) => {
  try {
    const movieDetails = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", movieDetails);
  } catch (err) {
    console.log("err", err);
  }
});
/* DELETE*/

router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    const movies = await Movie.find({});
    res.render("movies/movies", { movies });
  } catch (err) {
    console.log("err", err);
  }
});

/*EDIT*/

router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const movieDetailsToEdit = await Movie.findById(req.params.id).populate("cast");
    const celebrities = await Celebrity.find({});
    res.render("movies/edit-movie",{ movie: movieDetailsToEdit, celebrities:celebrities});
  } catch (err) {
    console.log("err", err);
  }
});

router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id,req.body);
    res.redirect(`/movies/${req.params.id}`);
  } catch (err) {
    console.log("err", err);
  }
});

module.exports = router;
