const router = require("express").Router();
const MovieModel = require('../models/Movie.model')
const CelebrityModel = require('../models/Celebrity.model');
const { get } = require("mongoose");


router.get("/movies/create", (req, res, next) => {
    CelebrityModel.find()
    .then((AllCelebrities) => res.render("movies/new-movie",{ AllCelebrities }))
    .catch((err) => next (err))
  });

router.get("/movies", (req, res, next) => {
    MovieModel.find()
    .then((allMovies) => res.render("movies/movies", { allMovies } ))
    .catch((err) => next (err))
})

router.get("/movies/:idMovie", (req, res, next) => {
    MovieModel.findById(req.params.idMovie)
    .populate("cast", "name occupation catchPhrase -_id")
    .then((movie) => res.render("movies/movie-details", movie))
    .catch((err) => next (err))
})

router.get("/movies/:idMovie/edit", (req, res, next) => {
    MovieModel.findById(req.params.idMovie)
    .populate(("cast"))
    .then((movie) => {
        CelebrityModel.find()
        .then((allCelebrities) => {
           const  movieAndCelebrities = { movie: movie, celebrities: allCelebrities}
            // res.json(movieAndCelebrities)
            res.render("movies/edit-movie", movieAndCelebrities)
        })
        .catch((err) => next (err))
    })
    .catch((err) => next (err)) 
})





router.post("/movies/create", (req, res, next) =>{
    const { title, genre, plot, cast } = req.body
    MovieModel.create( { title, genre, plot, cast } )
    .then(() => res.redirect("/movies"))
    .catch(() => res.render("movies/new-movie"))
})

router.post("/movies/:idMovie/delete", (req, res, next) => {
    MovieModel.findByIdAndRemove(req.params.idMovie)
    .then(() => res.redirect("/movies"))
    .catch((err) => next (err))
})

router.post("/movies/:idEdit", (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    MovieModel.findByIdAndUpdate(req.params.idEdit, { title, genre, plot, cast })
    .then((movie) => res.redirect(`/movies/${movie._id}`))
    .catch((err) => next (err))
})

module.exports = router