const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");


// all your routes here
router.get('/', (req,res) =>{
    Movie.find()
    .populate('cast')
    .then(allMoviesFromDB => {
        console.log(allMoviesFromDB)
        res.render('movies/movies.hbs', {movies: allMoviesFromDB});
    })
    .catch(error => {next(error)});
})

router.get('/create', (req,res) =>{
        Celebrity.find()
        .then(allCelebritiesFromDB => {
            console.log(allCelebritiesFromDB)
            res.render('movies/new-movie.hbs', {celebrities: allCelebritiesFromDB});
        })
        .catch(error => {next(error)});
})

router.post('/create', (req,res,next) =>{
    const {title, genre, plot, cast} = req.body;

    Movie.create({title, genre, plot, cast})
    .then(() => {
        res.redirect('/movies');
    })
    .catch(error => {res.render('movies/new-movie.hbs'); next(error)});
});

router.post('/:id/delete', (req, res) => {
    const {id} = req.params;

    Movie.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/movies');
    })
    .catch(error => next(error));
})

router.get('/:id', (req,res) =>{
    Movie.findById(req.params.id)
    .populate("cast")
    .then((theMovie) => {
        res.render('movies/movies-details.hbs', {movie: theMovie})
    })
    .catch(error => {next(error)});
})

module.exports = router;