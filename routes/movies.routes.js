const router = require("express").Router();

const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

// GET /movies
router.get("/movies", (req, res, next) => {
    MovieModel.find()
        .then((movies) => {
            res.render("movies/movies.hbs", {movies})
        })
        .catch((error) => {
            console.log(error)
        })
})

// GET /movies/create
router.get("/movies/create", (req, res, next) => {

        CelebrityModel.find()
        .then(() => {
            res.render("movies/new.movie.hbs")
        })
        .catch((error) =>{
             console.log(error)
        })
        
})

router.post("/movies/create", (req, res, next) => {
    const {title, genre, plot} = req.body

    MovieModel.create([{title, genre, plot}])
        .then(() => {
            res.redirect("/movies", {title, genre, plot})
        })
        .catch(() => {
            res.render("movies/new.movie.hbs")
        })
})

router.get("/movies/:id" , (req, res, next) => {
    const { id } = req.params
    //const {title, genre, plot} = req.body

    MovieModel.findById(id)
        // .populate('cast')
        .then((movie) => {
            res.render("movies/movie-details", movie)
        })
        .catch((error) => {
            console.log('Failed to find movie details')
        })
})


// router.post("/movies/:id/delete", (req, res, next) => {

// })

// router.get("/movies/:id/edit", (req, res, next) => {

// })

// router.post("/movies/:id/edit", (req, res, next) => {
    
// })

module.exports = router;
