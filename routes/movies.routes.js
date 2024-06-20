const router = require("express").Router();
const Movie = require("./../models/Movie.model")
const Celebrity = require("./../models/Celebrity.model")
// all your routes here

router.get("/", (req, res) => {
    Movie
        .find()
        .then(movies => res.render("movies/movies", { movies }))
        .catch(err => console.log("ERROR", err))
})

router.get("/create", (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render("movies/new-movie", { celebrities })
        })
        .catch(err => console.log("ERROR", err))
})

router.post("/create", (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(movie => {
            res.redirect("/movies")
        })
        .catch(err => console.log("ERROR", err))
})

router.get("/", (req, res) => {
    Movie
        .find()
        .then(movie => {
            res.render("/movies", { movie })
        })

})

router.get("/:_id", (req, res) => {

    const { _id } = req.params

    Movie
        .findById(_id)
        .populate("cast")
        .then(movie => res.render("movies/movie-details", movie))
        .catch(err => console.log("ERROR", err))

})

router.post("/:_id/delete", (req, res) => {

    const { _id } = req.params

    Movie
        .findByIdAndRemove(_id)
        .then(() => res.redirect("/movies"))
        .catch(err => console.log("ERROR", err))
})


router.get("/:_id/edit", (req, res) => {
    console.log("---------------------entro en get")
    const { _id } = req.params

    Promise.all([Movie.findById(_id), Celebrity.find()])
        .then(([movie, celebrities]) => {
            res.render("movies/edit-movie", { movie, celebrities })
        })
        .catch(err => console.log("ERROR", err))

})

router.post("/:_id/edit", (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { _id } = req.params
    Movie
        .findByIdAndUpdate(_id, { title, genre, plot, cast })
        .then(() => res.redirect("/movies"))
        .catch(err => console.log("ERROR", err))
})


module.exports = router;