const router = require("express").Router();
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

module.exports = router;