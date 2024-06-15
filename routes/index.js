const router = require("express").Router();
const Celebrity = require("../Models/Celebrity.model")
const Movie = require("../Models/Movie.model")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET celebrity creation page */
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

/* POST created celebrity */
router.post("/celebrities/create", (req, res, next) => {
  try {
    Celebrity.create(req.body)
    res.redirect("/celebrities");
  } catch (error) {
    console.log(error)
    res.render("celebrities/new-celebrity");
  }
});

/* GET celebrity list page */
router.get("/celebrities", async (req, res, next) => {
  const celebList = await Celebrity.find()
  res.render("celebrities/celebrities", { celebList });
});

/* GET movie creation page */
router.get("/movies/create", async (req, res, next) => {
  const celebList = await Celebrity.find()
  res.render("movies/new-movie", { celebList });
});

/* POST created movie */
router.post("/movies/create", (req, res, next) => {
  try {
    Movie.create(req.body)
    res.redirect("/movies");
  } catch (error) {
    console.log(error)
    res.render("movies/new-movie");
  }
});

/* GET movie list page */
router.get("/movies", async (req, res, next) => {
  const movieList = await Movie.find()
  res.render("movies/movies", { movieList });
});

/* GET movie details page */
router.get("/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast")
    res.render("movies/movie-details", { movie });
  } catch (error) {
    console.log(error)
  }
});

/* POST delete movie */
router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.redirect("/movies");
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;

/* GET movie edit page */
router.get("/movies/:id/edit", async (req, res, next) => {
  const movie = await Movie.findById(req.params.id)
  const celebs = await Celebrity.find()
  res.render("movies/edit-movie", { movie, celebs });
});

/* POST edited movie */
router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    console.log(req.params.id)
    await Movie.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/movies/" + req.params.id);
  } catch (error) {
    console.log(error)
    res.render("movies/edit-movie");
  }
});