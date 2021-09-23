// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const moviesController = require("../controllers/moviesController");
const routeGuards = require("./../middlewares/route-guard");
// all your routes here
//muestra el formulario
//crear todas las pelis
router.get("/create", routeGuards.isLoggedIn, moviesController.getCreatedMovies);

//esta ruta recibe la info del formulario
router.post("/create", routeGuards.isLoggedIn, moviesController.createMovie);

//mostrar todas las pelis
router.get("/", routeGuards.isLoggedIn, moviesController.getMovies);

//detalles
router.get("/:id", routeGuards.isLoggedIn, moviesController.movieDetails);

router.post("/:id/delete", routeGuards.isLoggedIn, moviesController.deleteMovie);
//editar peli
router.get("/:id/edit", routeGuards.isLoggedIn, moviesController.editMovie);

router.post("/:id/edit", routeGuards.isLoggedIn, moviesController.editMovieForm);

module.exports = router;
