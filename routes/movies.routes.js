// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

let editMovie = undefined
let celebrityAux = undefined

router.get("/", (req, res) => {

    Movie
        .find()
        .populate("cast", "name")
        .then(movies => res.render("movies/movies", { movies }))
        .catch(err => console.log(err))
})

router.get("/create", (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render("movies/new-movie", { celebrities }))
        .catch(err => console.log(err))

})

router.post("/create", (req, res) => {

    Movie
        .create(req.body)
        .then(() => res.redirect("/movies"))
        .catch(() => res.redirect("/movies/create"))
})

router.get("/:movieID", (req, res) => {

    const { movieID } = req.params

    Movie
        .findById(movieID)
        .populate("cast")
        .then(movie => res.render("movies/movie-details", movie))
        .catch(err => console.log(err))
})

router.post("/:movieID/delete", (req, res) => {

    const { movieID } = req.params

    Movie
        .findByIdAndDelete(movieID)
        .then(() => res.redirect("/movies"))
        .catch(err => console.log(err))
})

router.get("/:movieID/edit", (req, res) => {

    const { movieID } = req.params

    Movie
        .findById(movieID)
        .then((movie) => {
            editMovie = movie
            celebrityAux = Celebrity.find().select({ name: 1 })
            return celebrityAux
        })
        .then((celebrityAux) => res.render("movies/edit-movie", { editMovie, celebrityAux }))
})

router.post("/:movieID/edit", (req, res) => {

    const { movieID } = req.params

    Movie
        .findByIdAndUpdate(movieID, req.body, { new: true })
        .populate("cast")
        .then((movie) => res.render("movies/movie-details", movie))
        .catch(err => console.log(err))
})

module.exports = router;