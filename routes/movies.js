const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/", (req, res, next) => {
    Movie.find()                                           
    .then(moviesFromDB => {
        // console.log(moviesFromDB)
        res.render("movies/movies", { movies: moviesFromDB })
    })
    .catch(err => next(err))
})

router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render("movies/new-movies", { celebrities })
    })
})

router.post("/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie.create({ title,genre,plot, cast })
        .then(createdMovie => {
            console.log(createdMovie)
            res.redirect("/movies") 
        })
        .catch(err => { 
            next(err)
            if (err) res.render("movies/new-movies") 
        })
})

router.get("/:id", (req, res, next) => {
    let id = req.params.id
    Movie.findById(id)
    .populate("cast")
    .then(data => {
        console.log(data)
        res.render("movies/movie-details", { specificMovie: data} )
    })
})

router.post("/:id/delete", (req, res, next) => {

})


module.exports = router;