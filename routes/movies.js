const router = require("express").Router();

const Movie = require("./../models/Movie.model")

const Celebrity = require("./../models/Celebrity.model")

router.get("/movies/create", (req, res) => {

    Celebrity
        .find()
        .then(celeb => {
            res.render("movies/new-movie", { celeb })
        })
        .catch(err => console.log(err))

})

router.post("/movies/create", (req, res) => {

    const { title, genre, plot, cast } = req.body


    Movie
        .create({ title, genre, plot, cast })
        .then(movie => {
            res.redirect("/movies")
        })
        .catch(x => {
            res.render("movies/new-movie")
        })

})

router.get("/movies", (req, res) => {

    Movie
        .find()
        .then(movie => {
            res.render("movies/movies", { movie })
        })
        .catch(err => console.log(err))
})


router.get("/movies/:id", (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate("cast")
        .then(movie => res.render("movies/movie-details", movie))
        .catch(err => console.log(err))
})

router.post("/movies/:id/delete", (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(x => {
            res.redirect("/movies")
        })
        .catch(err => console.log(err))
})


//EDIT GET
router.get("/movies/:id/edit", (req, res) => {

    const { id } = req.params

    Promise.all([Movie.findById(id), Celebrity.find()])
        .then(([movie, celeb]) => {
            res.render("movies/edit-movie", { movie, celeb })
        })
        .catch(err => console.log(err))
})

//EDIT POST
router.post("/movies/:id/edit", (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(x => {
            res.redirect("/movies")
        })
        .catch(err => console.log(err))
})


module.exports = router;