const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require('../models/Celebrity.model')

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
        .then((celebritiesFromDB) => {
            res.render('movies/new-movie', {celebritiesList: celebritiesFromDB})
        })
        .catch((error) => console.log('Error occured, could not display a form to create a movie', error))
    
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch((error) => console.log('Error occured, could not create movie', error))
})

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then((moviesFromDB) => {
            const data = {
                listOfMovies: moviesFromDB
            }
            res.render('movies/movies', data)
        })
        .catch((error) => {
            console.log('An error occured, could not load movies list', error);
            next(error);
        }) 
})

router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then((movieFromDB) => {
            res.render('movies/movie-details', movieFromDB)
        })
        .catch((error) => {
            console.log('An error occured, could not load movie details', error);
            next(error);
        });
})

router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch((error) => {
            console.log('An error occured, could not delete movie', error);
            next(error);
        });
})

router.get('/movies/:id/edit', (req, res, next) => {
    const celebritiesList = Celebrity.find()
    const movieDetails = Movie.findById(req.params.id).populate('cast')
    Promise.all([movieDetails, celebritiesList])
        .then((data) => {
            let movie = data[0];
            let celebrities = data[1]
            res.render('movies/edit-movie', {movie, celebrities})
        })
        .catch(error => console.log('Could not load movie details', error))
    
})

router.post('/movies/:id/edit', (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    const newDetails = {
        title,
        genre,
        plot,
        cast
    };
    Movie.findByIdAndUpdate(req.params.id, newDetails, { new: true })
        .populate('cast')
        .then((updatedMovie) => {
            res.redirect(`/movies/${updatedMovie._id}`)
        })
        .catch((error) => {
            console.log(error);
        })
})


module.exports = router;