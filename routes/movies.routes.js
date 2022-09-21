// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here


router.get("/movies/create", (req, res) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("movies/new-movie", {celebrities: celebrities})
        })
        .catch(err=>console.log(err))
})

router.post("/movies/create", (req, res) => {
    Movie.create(req.body)
        .then(() => {
            res.redirect("/movies")
        })
        .catch(err =>  console.log(err))
})

router.get("/movies/", (req, res) => {
    Movie.find()
        .then(movies => {
            res.render("movies/movies", {movies: movies})
        })
        .catch(err => console.log(err))
})


router.get("/movies/:id", (req, res) => {
    Movie.findById(req.params.id)
        .populate("cast")
        .then(detailsMovie => {
            res.render("movies/details", detailsMovie)
        })
        .catch(err => console.log(err))
})

router.post("/movies/:id/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch(err => console.log(err))
})

router.get("/movies/:id/edit", (req,res) =>{
    Movie.findById(req.params.id)
        .then(movie => {
            return Celebrity.find()
            .then(celebrities => {
                res.render("movies/edit-movie", { celebrities: celebrities, movie: movie })
            }) 
        })
        .catch(err => console.log(err)) 
})

router.post("/movies/:id/edit", (req,res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(() =>{
        res.redirect("/movies")
    })
    .catch(err => console.log(err))
})

module.exports = router;