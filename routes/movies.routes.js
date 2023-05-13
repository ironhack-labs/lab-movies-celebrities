// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here
router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        const celebritiesList = {celebrities}
        res.render("./movies/new-movie", celebritiesList)
    })
    .catch(err => next(err))    
})

router.post("/create", (req, res, next) => {
    console.log(req.body)
    const newMovieInfo = req.body
    Movie.create(newMovieInfo)
    .then(() => {
        res.render("./movies/movies")
    })
    .catch(err => next(err)) 
})

router.get("/", (req,res,next) => {
    Movie.find()
    .then((movies) => {
        const moviesList = {movies}
        res.render("./movies/movies", moviesList)
    })
    .catch(err => next(err))
})

router.get("/:movieId", (req,res,next) => {
    res.render("./movies/movie-details")
})


module.exports = router;