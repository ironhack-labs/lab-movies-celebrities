

const express		= require("express")
const router = require("express").Router();

const moviesController		= require("./../controllers/moviesController")



// homepage movies
router.get("/",moviesController.getMovies)

// create movie
router.get("/create",moviesController.createMovies)

// post form
router.post("/create",moviesController.createMoviesForm)






module.exports = router;