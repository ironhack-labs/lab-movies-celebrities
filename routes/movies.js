const router = require("express").Router();
module.exports = router

const { find } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// MOVIE LIST
router.get("/movies", (req, res) => {
    Movie
        .find()
        .then(list => res.render("./movies/movies-list", { list }))
        .catch(err => {
            console.log(err)
        })
})
//CREATE MOVIE
router.get("/movies/create", (req, res) => {
    Celebrity
        .find()
        .then(list => res.render("./movies/movies-new", { list }))
        .catch(err => {
            console.log(err)

        })
})

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => {
            res.render("./movies/movies-new")
            console.log(err)
        })
})

//MOVIE DETAILS

router.get("/movies/:id/details", (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render("./movies/movies-details", movie))
        .catch(err => {
            console.log(err)
        })
})

//MOVIE DELETE

router.post("/movies/:id/details", (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect("/movies"))
        .catch(err => {
            console.log(err)
        })
})

//MOVIE EDIT

router.get("/movies/:id/edit", (req, res) => {

    const { id } = req.params
    // no se como ponerlo bien (si es que este es el "formato malo")
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {

            Celebrity
                .find()
                .then(list => res.render("./movies/movies-edit", { movie, list }))
        })

        .catch(err => {
            console.log(err)
        })
})

router.post("/movies/:id/edit", (req, res) => {

    const { id } = req.params
    let { name, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { name, genre, plot, cast })

        .then(() => res.redirect("/movies"))

        .catch(err => {
            console.log(err)
        })
})

module.exports = router