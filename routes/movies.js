const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')
// all your routes here

//GET routes
router.get("/movies", async (req, res) => {
    try{
        const allMovies = await Movie.find({})
        res.render("movies/movies", {allMovies});
        console.log(allMovies)
    }catch (err){
        console.log(err)
    }
});

router.get("/movies/create", async (req, res) => {
    try {
        const allCelebrities = await Celebrity.find({})
        //console.log(allCelebrities)
        res.render("./movies/newMovie", {allCelebrities})
    }catch (err){
        console.log(err)
    }
})

//POST route (when the form is filled )

router.post("/movies/create", async (req, res) => {
    const {title, genre, plot, cast} = req.body
    
    try {
        const createdMovie = await Movie.create({title, genre, plot, cast})
        const allMovies = await Movie.find({})
        //console.log(createdMovie)
        if(createdMovie) {
            res.render("./movies/movies", {allMovies});
        }else {
            res.render("./movies/newMovie", {errMsg: "There is an error creating a new Movie. Please try again"})
        }
    }catch (err) {
        console.log(err)
    }
});


//GET movies by its ID

router.get("/movies/:id", async (req, res) => {
    try{
    const movie = await Movie.findById(req.params.id).populate('cast')
    const cast = movie.cast
    res.render("./movies/movieDetails", movie);
    //console.log(user)
    }catch (err) {
        console.log(err)
    }    
  });

module.exports = router;