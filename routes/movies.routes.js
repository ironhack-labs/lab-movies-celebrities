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
    const {title, genre, plot} = req.body
    const cast = req.body.celebrity
    const newMovieInfo = {title, genre, plot, cast}
    Movie.create(newMovieInfo)
    .then(() => {
        res.redirect("/movies") // (This redirects to the route defined in the next block of code; the one that does "router.get("/", ....")
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
    //console.log(req.params)
    let movieId = req.params.movieId;
    Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
        //console.log(movie)
        res.render("./movies/movie-details", movie)
    })
    .catch(err => next(err))    
})

router.post("/:movieId/delete", (req, res, next) => {
    let movieId = req.params.movieId;
    Movie.findByIdAndDelete(movieId)
    .then(() => {
        res.redirect("/movies")
    })
    .catch(err => next(err))   
})

router.get("/:movieId/edit", (req, res, next) => {
    let movieId = req.params.movieId;
    let editData = {} // <-- I will be filling this variable with diverse data across the sequence of promises:
    Movie.findById(movieId)
    .then((movieDetails) => {
        editData.movie = movieDetails
        return Celebrity.find() // Importante poner aquí un return! Sin ello no pasan los datos al siguiente ".then".
    })
    .then((celebrities) => {
        //console.log("celebrities: ",celebrities)
        editData.celebrities = celebrities
        //console.log(editData)
        res.render("./movies/edit-movie", editData)
    })
    .catch(err => next(err)) 
})

router.post("/:movieId/edit", (req, res, next) => {
    //console.log(req.body)
    const movieId = req.params.movieId;
    const updatedMovie = req.body
    Movie.findByIdAndUpdate(movieId, updatedMovie)
    .then(() => {
        res.redirect(`/movies/${movieId}`)
    })
    .catch(err => next(err))   
})


module.exports = router;