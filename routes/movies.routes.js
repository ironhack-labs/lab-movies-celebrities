const router = require("express").Router();

const { findById, find } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

//create movie
router.get("/create", (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render("movies/new-movie", { celebrities })
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

//show movies
router.get("/", (req, res) => {
    Movie
        .find()
        .select('title')
        .then(movies => res.render("movies/movies", { movies }))
        .catch(err => console.log(err))
})

//movie details
router.get("/:id", (req, res) => {
    const movieid = req.params

    Movie
        .findById(movieid.id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

//delete movies
router.post("/:id/delete", (req, res) => {
    const movieid = req.params

    Movie
        .findByIdAndDelete(movieid.id)
        .then(() => res.redirect("/movies"))
        .catch(err => console.log(err))
})

//edit movies
router.get("/:id/edit", (req, res) => {
    const movieid = req.params

    Celebrity
        .find()
        .then(celebs => {
            Movie
                .findById(movieid.id)
                .then(movie =>  res.render('movies/edit-movie', {movie, celebs}))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post("/:id/edit", (req,res)=>{
    const {title, genre, plot, cast} = req.body
    const movieid = req.params

    Movie   
        .findByIdAndUpdate(movieid.id, {title, genre, plot, cast}, {new:true})
        .then(updatedMovie =>  res.redirect(`/movies/${updatedMovie._id}`))
        .catch(err => console.log(err))
})

module.exports = router;