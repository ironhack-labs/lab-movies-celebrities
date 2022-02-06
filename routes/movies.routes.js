const router = require("express").Router()
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")


// CREATING MOVIES 
router.get("/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .find(name, occupation, catchPhrase)
        .then(celebs => {
            res.render("movies/new-movie", { celebs })
        })
        .catch(err => console.log(err))
})

router.post("/create", (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies")
        })
        .catch(err => console.log(err))
})



// FINDING MOVIES

router.get("/", (req, res) => {
    Movie
        .find()
        .then(movies => {
            res.render("movies/movies", { movies })
        })
        .catch(err => console.log(err))
})


router.get("/:id", (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movie
        .findById(id)
        .populate("cast")
        .then(movies => {
            res.render("movies/movie-details", { movies })
        })
        .catch(err => console.log(err))
})

// EDITING MOVIES

router.get("/:id/edit", (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .then(() => res.render("movies/edit-movie"))
        // .then(movieDet => {
        //     Celebrity
        //         .find()
                
        // })
        .catch(err => console.log(err))

})


router.post("/:id", (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast} = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast }, {new: true})
        .then(() => {
            res.redirect("/movies")
        })
        .catch(() => {
            res.render("/:id")
        })
})





// DELETING MOVIES
router.post("/:id/delete", (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect("/movies")
        })
        .catch(err => console.log(err))
})

module.exports = router