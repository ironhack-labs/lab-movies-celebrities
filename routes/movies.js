//importaciones
const express = require('express');
const router = express.Router();
const moviesController = require('./../controllers/moviesCtrl')

//list movies
router.get('/', moviesController.getMovies)
//movie view
router.get('/:movieID/view', moviesController.viewMovie)

//create movie
router.get('/create', moviesController.newMovie)
//create movie
router.post('/create', moviesController.newMovieForm)


//edit movie
router.get('/:movieID/edit', moviesController.editMovie)
//edit movie
router.post('/:movieID/edit', moviesController.editMovieForm)

//delete movie
router.post('/:movieID/delete', moviesController.deleteMovie)

//exportacion
module.exports = router