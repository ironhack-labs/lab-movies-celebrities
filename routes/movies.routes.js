

const express		= require("express")
const router = require("express").Router();

const moviesController		= require("./../controllers/moviesController")



// homepage movies
router.get("/",moviesController.getMovies)

// create movie
router.get("/create",moviesController.createMovies)

// post form
router.post("/create",moviesController.createMoviesForm)


// CREAR UNA PÁGINA INDIVIDUAL PARA CADA LIBRO CON LOS DATOS RESPEECTIVOS

router.get("/:movieID", moviesController.getSingleMovie)

// CREAR PÁGINA PARA EDITAR FORMULARIO
//router.get("/:movieID/edit", moviesController.editMovie)

// ENVIAR DATOS DE FORMULARIO PARA EDITAR LIBRO EN BD
//router.post("/:movieID/edit", moviesController.editMovieForm)

// BORRAR LIBRO
//router.post("/:movieID/delete", moviesController.deleteMovie)





module.exports = router;