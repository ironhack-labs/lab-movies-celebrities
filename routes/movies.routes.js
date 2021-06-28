const router = require('express').Router();
const CelebrityModel = require('../models/Celebrity.model');
const MovieModel = require('../models/Movie.models');

router.get('/movies/create', (req, res, next) => {
    CelebrityModel.find({}, 'name')
        .then((celebrityData) => {
            res.render('movies/new-movie.hbs', {celebrityData});
        })
})

router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    MovieModel.create({title, genre, plot, cast})
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
            next(err);
        })
})

router.get('/movies', (req, res, next) => {
    MovieModel.find()
        .then((movieData) => {
            res.render('movies/movies.hbs', {movieData})      
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

router.get('/movies/:id', (req, res, next) => { 
    const {id} = req.params;
    MovieModel.findById(id)
        .populate('cast')
        .then((singleMovieData) => {
            res.render('movies/movie-details.hbs', {singleMovieData});
        })
        .catch(err => {
            next(err);
        })
})

router.post('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params;
    MovieModel.findByIdAndDelete(id)
    .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
           next(err);
        })
})

router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;

    Promise.all([MovieModel.findById(id), CelebrityModel.find()])
        .then(( [singleMovieData, celebrityData] ) => {
            // Manipulate data
            const {selectedCelebrities, notSelectedCelebrities} = createSelectedArrays(celebrityData, singleMovieData);
            res.render('movies/edit-movie.hbs', {singleMovieData, selectedCelebrities, notSelectedCelebrities});
          })
          .catch((err) => {
              next(err);
          })
})

router.post('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    const {title, genre, plot, cast} = req.body;

    MovieModel.findByIdAndUpdate(id, { title, genre, plot, cast } , {new: true})
    .then(() => {
        res.redirect('/movies');
    })
    .catch((singleMovieData) => {
        res.render('movies/edit-movie.hbs', {singleMovieData});
    })
})

function createSelectedArrays(celebrities, movie) {
    selectedCelebrities = [];
    notSelectedCelebrities = [];
    celebrities.forEach(celebrity => {
        movie.cast.forEach(castMember => {
            if ( celebrity._id.equals(castMember._id) ) {
                selectedCelebrities.push(celebrity)
            }
            else {
                notSelectedCelebrities.push(celebrity)
            }
        })
    })
    return {selectedCelebrities, notSelectedCelebrities}
}


module.exports = router;