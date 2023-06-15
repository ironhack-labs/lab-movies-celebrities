// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all your routes here

router.get('/', (req,res,next) => {
    Movie.find()
    .populate('cast')
    .then((newDataMovie) => {
        res.render('movies/movies', { newMovie: newDataMovie });
    })
})

router.get('/create', (req, res, next) => {
    Celebrity.find()
		.then((dataOfNewCeleb) => {
			res.render('movies/new-movie', { celebrity: dataOfNewCeleb });
		})
		.catch((err) => {console.log('Error creating movie'), {err} });
});


router.post(('/create'), (req,res,next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    };

    Movies.create(newMovie)
    .then(() => {
        res.redirect('movies')
    })
    .catch(err => {console.log('Error creating movies'), {err}})
})

router.get(('/movies/:movieId'), (req,res,next) => {
    const { movieId } = req.params
    Movie.findById(movieId) 
    .populate("cast")
    .then((movie) => res.render("movies/movie-details", {movie}))
    .catch((err) => console.log('Err getting movie id', err))
})

module.exports = router;