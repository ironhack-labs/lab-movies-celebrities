// starter code in both routes/movies.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model")

// all your routes here
//CREATE NEW movie
router.get("/create", (req,res)=>{
    res.render("movies/new-movie")
})

router.post("/new-movie", (req,res,next)=>{
    console.log(Movie)
    const {title, genre, plot} = req.body
    Movie.create({title, genre, plot})
        .then(newMovie=>{
        console.log(newMovie)
            res.redirect("/movies/movies")
     }).catch((error)=> {
        console.log(error)
             res.redirect("/movies/create")});
});

//movie LIST
router.get("/movies", (req,res)=>{
    console.log("helloooo")
    Movie.find().then((movies)=>{
        console.log(movies)
         res.render("movies/movies", {movies})
    }).catch((err) => console.log(err))
});

module.exports = router;