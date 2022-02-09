//importaciones
const express = require('express');
const router = express.Router();
const moviesController = require('./../controllers/moviesCtrl')

//list movies
router.get('/', moviesController.getMovies)


//create movie
router.get('/create', moviesController.newMovie)
//create movie
router.post('/create', moviesController.newMovieForm)


//edit movie
router.get('/:id/edit', moviesController.editMovie)
//edit movie
router.post('/:id/edit', moviesController.editMovieForm)

//delete movie
router.get('/:id/delete', moviesController.deleteMovie)

//exportacion
module.exports = router