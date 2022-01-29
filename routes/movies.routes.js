const router = require("express").Router();
const Movie = require("../models/Movie.model");

// all your routes here
router.get('/', (req,res) =>{
    Celebrity.find()
    .then(allMoviesFromDB => {
        res.render('movies/movies.hbs', {movies: allMoviesFromDB});
    })
    .catch(error => {next(error)});
})

router.get('/create', (req,res) =>{
    res.render('movies/new-movie.hbs')
})

router.post('/create', (req,res,next) =>{
    const {title, genre, plot, cast} = req.body;

    Movie.create({title, genre, plot, cast})
    .then(() => {
        res.redirect('/');
    })
    .catch(error => {res.render('movies/new-movie.hbs'); next(error)});
});


module.exports = router;