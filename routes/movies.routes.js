const router = require("express").Router();
const moviesControllers = require("../controllers/movie.controllers")

const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model");
// all your routes here
router.get("/", moviesControllers.viewMovies);

router.get("/create", moviesControllers.addMovie);
router.post("/create", moviesControllers.doAddMovie);

router.post("/:id/delete", moviesControllers.deleteMovie);

router.get("/:id/edit", moviesControllers.editMovie);
router.post("/:id/edit", moviesControllers.doEditMovie);

router.get("/:id", moviesControllers.movieDetails);

module.exports = router;