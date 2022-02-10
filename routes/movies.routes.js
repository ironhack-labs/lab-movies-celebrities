// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express")
const router = express.Router()

// all your routes here
const movieController = require("./../controllers/movieController")

router.get("/", movieController.getMovies);

router.get("/create", movieController.createMovie);

router.post("/create", movieController.createMovieForm);



module.exports = router;