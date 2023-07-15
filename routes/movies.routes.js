const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();


router.get ('/', (req,res, next) => {
    Movie.find()
    .then (movies => {
    res.render("movies/movies", {movies})    
    })
    .catch((error) => {
        console.log(error)
    })
})




router.get("/create", (req,res, next) => {
    Celebrity.find()
    .then((celebrities)  => {
        res.render("movies/new-movie", {celebrities})
    })
    .catch(error => {
        console.log(error)
    })
})

router.post("/create", (req, res, next) => {
    const {title, plot, genre, cast} = req.body;
    console.log(cast)

    Movie.create({title, genre, plot, cast})
    .then(() => {
        res.redirect('/movies')
    })

    .catch((error) => {
        console.log("catch the movie error")
        res.render("movies/new-movie")
    })
})

router.get('/:id', (req, res, next)=> {
    const movieID = req.params.id

   Movie.findById(movieID)
   .populate("cast")
   .then((movie) => {
    res.render('movies/movie-details', {movie})
   })
   .catch((error) => {
    console.log(error)
   })   
})

router.post('/:id/delete', (req, res, next) => {
    const movieID = req.params.id

    Movie.findByIdAndRemove(movieID)
    .then(() => {
        res.redirect('/movies')
    })
    .catch((error) => {
        console.log(error)
    })
})



module.exports = router;