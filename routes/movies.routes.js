const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/movies/create", (req, res) => {

    Celebrity.find()
        .then(allCelebs => res.render("movies/new-movie", {allCelebs}))
        .catch(err => console.log(err))
})

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast, movieId } = req.body;
  
    Movie.create({ title, genre, plot, cast, movieId })
        .then(() => res.redirect("/movies"))
        .catch(() => res.render("movies/new-movie"))
})

router.get("/movies", (req, res) => {
    Movie.find()
        .then(movies => {
            res.render("movies/movies", {movies})
        })
        .catch(err => console.log(err))
})

router.get("/movies/:id", (req, res) => {
    const {id} = req.params

    Movie.findById(id)
        .populate("cast")
        .then(movie => {
            res.render("movies/movie-details", movie)
        })
        .catch(err => console.log(err))
})

router.post("/movies/:id/delete", (req, res) => {
    const {id} = req.params

    Movie.findByIdAndRemove(id)
        .then(() => res.redirect("/movies"))
        .catch(err => console.log(err))
})

// router.get("/movies/:id/edit", (req, res) => {

//     Celebrity.find()
//         .then(allCelebs => res.render("movies/new-movie", {allCelebs}))
//         .catch(err => console.log(err))
// })

router.get("/movies/:id/edit", (req, res) => {
    const {id} = req.params

    Celebrity.find()
        .then((celebrities) => {
            Movie.findById(id)
            .populate("cast")
            .then(({movie, celebrities}) => {
                console.log(movie);
                res.render("movies/edit-movie", {movie, celebrities})
        })
        })
})

router.post("/movies/:id/edit", (req, res) => {
    console.log("hola");
    const { title, genre, plot, cast } = req.body;
    const {id} = req.params

    Movie.findByIdAndUpdate(id, {title, genre, plot, cast}, {new: true})
        .populate("cast")
        .then(movie => {
            console.log(movie);
            res.render("movies/movie-details", movie)
        })
        .catch(err => console.log(err))
})

module.exports = router;
