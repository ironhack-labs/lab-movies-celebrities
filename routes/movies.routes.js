// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
//require celebrities from the database for "cast" dropdown menu
const Celebrity = require("../models/Celebrity.model");

// Creating a movie 
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then(allCelebritiesFromDB => {
        res.render('movies/new-movie', {celebrities: allCelebritiesFromDB })
    })
    .catch(err => {console.log('There was an error retrieving the page from the server:', err)})
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
    .then(newSavedMovie => {
        res.redirect('/movies');
    })
    .catch(err => console.log("An error occurred while creating your movie", err))
});

// Listing movies
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(allMoviesFromDB => {
        res.render('movies/movies', { movies: allMoviesFromDB });
    })
    .catch(err => console.log('There was an error while retrieving your list of movies', err))
});

// Movie details routing
router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
    .populate('cast')
    .then(movieDetail => {
        res.render('movies/movie-details', movieDetail);
    })
    .catch(err => console.log("There was an error while attempting to display movie details", err));
});

// Deleting movies
router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log("There was an error while trying to delete the movie", err))
});

// Editing movies
router.get('/movies/:movieId/edit', (req, res, next) => {
    Movie.findById(req.params.movieId)
    .populate('cast')
    .then((movieToUpdate) => {
        let castId = movieToUpdate.castId;
        Celebrity.findById(castId)
        .then((castFromDB) => {
            Celebrity.find()
            .then((allCelebritiesFromDB) => {
                res.render('movies/edit-movie', { movie: movieToUpdate, cast: castFromDB, celebrities: allCelebritiesFromDB });
            })
        })   
    })
    .catch(err => console.log("There was an error while trying to update the movie", err))
})

router.post('/movies/:id/edit', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast }, { new: true })
    .populate('cast')
    .then((updatedMovie) => {
        res.redirect(`/movies/${req.params.id}`);
    })
    .catch(err => console.log('An error occurred while trying to submit the form', err))
});


module.exports = router;  