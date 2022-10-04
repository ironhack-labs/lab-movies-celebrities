const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");


router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then((celebArr) => {
        res.render("movies/new-movie", {celebArr})
    })
    
})

router.post("/movies/create", (req, res, next) => {
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.create(movieDetails)
    .then((movieDetails)=>{
       res.redirect("/movies")
    })
    .catch((err)=>{ 
     //   res.render("movies/new-movie")
    })
})


router.get("/movies", (req, res, next) => {
    Movie.find()
    .then((moviesArr) => {
        res.render("movies/movies", {moviesArr})
    })
    .catch()
})


router.get("/movies/:id", (req, res, next) => {

    Movie.findById(req.params.id)
    .populate("cast")
    .then((result) => {
        console.log(result)
        res.render("movies/movie-details", {result: result, cast: result.cast})
       // res.send(result)
    })
    .catch()
})



router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(() => {
        res.redirect("/movies")
    })
    .catch()
})


router.get("/movies/:id/edit", (req, res, next) => {
    let celebrities;
    Celebrity.find()
    .then((celebritiesArr) => {
        celebrities = celebritiesArr;
        return Movie.findById(req.params.id) 
    })
    .then((movieDetails) => {
        res.render("movies/edit-movie", {movieDetails, celebrities})
    })
    .catch()
})

router.post("/movies/:id", (req, res, next) => {
    const updatedMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.findByIdAndUpdate(req.params.id, updatedMovie)
    .then((result) => {
     res.redirect(`/movies/${req.params.id}`)
       
    })
    .catch()
})

module.exports = router;