const router = require("express").Router();
const { findById } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

router.get("/", (req, res, next) => {
    
    Movie.find().then(function(data) {
        res.render("movies/movies", {movies: data})
    })
  });


router.get("/create", (req, res, next)=>{
    res.render("movies/new-movie")
}); 

router.post("/create", (req, res, next)=>{

    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }
    
    console.log(req.body)

    Movie.create(movieDetails)
    .then(function(){
        res.redirect("/movies")
    })
    
})

router.get("/new-movie", (req,res) => {
    res.render("movies/new-movie")
})

router.get("/:movieId", (req,res) => {
    Movie.findById(req.params.movieId)
    .then(function(data){
        console.log(data)
        res.render("movies/movie-details", {movie: data})
    })
})

router.get("/:movieId/edit", (req, res, next)=>{
    Movie.findById(req.params.movieId)
    .then(movieDetails =>{

        res.render("movies/edit-movie", {movies: movieDetails})
    })
})

router.post("/:movieId/edit", (req,res,next)=>{

    const movieId = req.params.movieId
    const newDetails = {

        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.findByIdAndUpdate(movieId, newDetails)
    .then( () => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch( err => {
      console.log("Error updating a movie...", err);
    });
});

router.post("/:movieId/delete", (req,res,next)=>{
    Movie.findByIdAndDelete(req.params.movieId)
    .then(()=>{
        res.redirect("/movies")      
    })
});
module.exports = router;