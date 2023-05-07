const router = require("express").Router();
const Movie = require("./../models/Movie.model")
const Celebrity = require("./../models/Celebrity.model")

router.get("/movies", (req, res, next) => {
    Movie
        .find()
        .then(movie => res.render("movies/movies", { movie }))
})

router.get("/movies/create", (req, res, next) => {
    Celebrity
        .find()
        .then(celebrity => res.render("movies/new-movie", { celebrity }))
        .catch(err => console.log("el Error es => ", err))
})

router.post("/movies/create", (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect("/movies"))
        .catch(err => console.log("error =>", err))
})

router.get("/movie/:id", (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movies-datails', { movie }))
        .catch(err => console.log("error =>", err))
})

router.post("/movie/:id/delete", (req, res, next) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect("/movies"))
        .catch(err => console.log("el erro es => ", err))
})

router.get("/movie/:id/edit", (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then((movie) => { return movie })
        .then(movie => {
            Celebrity
                .find()
                .then(celebrity => { return res.render("movies/edit-movie", { movie, celebrity }) })
        })
        .catch(err => console.log("el erro es => ", err))
})

router.post("/movie/:id/edit", (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movie/${id}`))
        .catch(err => console.log("el error es => ", err))
})
router.get("/movie/:id/delete", (req, res, next) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect("/movies"))
        .catch(err => console.log("el error es => ", err))
})
module.exports = router
