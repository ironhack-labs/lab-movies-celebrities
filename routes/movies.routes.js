// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const moviesController = require("../controllers/moviesController")

// all your routes here
//muestra el formulario
//crear todas las pelis
router.get("/create", moviesController.getCreatedMovies)

//esta ruta recibe la info del formulario 
router.post("/create", moviesController.createMovie)

//mostrar todas las pelis
router.get("/", moviesController.getMovies)

//detalles
router.get("/:id", moviesController.movieDetails)

router.post("/:id/delete", moviesController.deleteMovie)
//editar peli
router.get("/:id/edit", moviesController.editMovie)

router.post("/:id/edit", moviesController.editMovieForm)

module.exports = router;