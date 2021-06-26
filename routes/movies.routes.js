// const router = require("express").Router();
// router.get("/movies", (req, res, next) => {
//     res.send('Movies Page!')
// });

// module.exports = router;
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')



module.exports = router => {

    router.get("/movies", (req, res, next) => {
        Movie
        .find({})
        .then( movies => {
            // res.send(movies)
            res.render('movies/movies', {movies})
        })
    });

    router.get("/movie/create", (req, res, next) => {
        res.render('movies/new-movie')
    });
    
router.post("/movie/create", (req, res, next) => {
    const movie = req.body
    const {title, image, genre, plot, cast} = movie
    const validationConst = title && genre && image && plot 

    if(!validationConst){
        res.render('movies/new-movie', {errorMessage: `All fields are mandatory.`})
        return
    }
    

    Movie
        .findOne({title})
        .then( foundMovie => {
            if(foundMovie){
                res.render('movies/new-movie', {errorMessage: `${movie} already registered.`})
                return
            }
        })



    Movie
        .create( movie)
        .then( () => res.redirect('/movies'))
        .catch(err => console.log(err))

});

    router.get("/edit-movie", (req, res, next) => {
        res.render('movies/edit-movie')
    });

    router.get("/movie-details", (req, res, next) => {
        res.render('movies/movie-details')
    });



}