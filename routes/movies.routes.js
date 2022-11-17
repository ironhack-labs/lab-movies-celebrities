// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here
router.get("/movies/create", (req, res, next) =>{
    Celebrity.find()
   .then((AllCelebs)=>{
    console.log(AllCelebs)
    res.render("movies/new-movie", {AllCelebs})
   })
})

router.post("/movies/create", (req, res, next) => {
    const {title, genre, plot, cast} = req.body
    console.log(req.body)
    Movie.create({title, genre, plot, cast})
    .then(() => {
        res.redirect("/movies/movies")
    })
    .catch((err) =>{
        console.log(err)
        res.render("movies/new-movie")
    })
})

router.get("/movies/movies", (req, res, next) =>{
    Movie.find()
    .then((AllMovies)=>{
     res.render("movies/movies", {AllMovies})
    })
    .catch((err) =>{
     console.log(err)
    })
 })

module.exports = router;