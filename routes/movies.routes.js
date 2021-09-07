const router = require("express").Router();
const mongoose = require("mongoose")
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
// all your routes here

router.get("/movies/create" , (req,res) =>{
Celebrity.find()
.then(allCelebrities => 
    res.render("movies/new-movie", {allCelebrities}))
.catch(err => console.log(err))
})

router.post("/movies/create" , (req, res) => {

    const {title, genre, plot, cast} = req.body

    Movie
    .create({title,genre, plot, cast})
    .then(createdMovie => {
        
        res.redirect("/movies/movies")
    })
    .catch(err => console.log(err))
})

router.get("/movies/movies", (req, res) =>{
    Movie
    .find()
    .then(allMovies => res.render("movies/movies", {allMovies}))
})

router.get("/movies/:id", (req,res) =>{
    const { id } = req.params
    
    Movie
    .findById(id)
    .populate("cast")
    .then(movieData =>
        res.render("movies/movie-details",  movieData)
    )
    .catch(err => console.log(err))
})

router.post("/movies/:id/delete", (req, res) =>{

    const {id} = req.params
Movie
.findByIdAndDelete(id)
.then(res.redirect("/movies/movies"))
.catch(err => console.log(err))
})


router.get("/movies/:id/edit" , (req, res) =>{

    const {id} = req.params

    let celebritiesArr = []

    Celebrity
    .find()
    .then(allCelebrities => res.send(allCelebrities))
    .catch(err => console.log(err))
    
    
    Movie
    .findById(id)
    .populate("cast")
    .then((movieToUpdate, allCelebrities) => { console.log(` this celebrities: ${allCelebrities}`),
        res.render("movies/edit-movie", movieToUpdate, celebritiesArr)})
    .catch(err => console.log(err))
})




module.exports = router;