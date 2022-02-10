//importaciones
const express = require('express');
const router = express.Router();
const moviesController = require('./../controllers/moviesCtrl')
const routeGuard = require('./../middlewares/routeGuard');

//list movies
router.get('/', moviesController.getMovies)
//movie view
router.get('/:movieID/view', moviesController.viewMovie)

//create movie
router.get('/create', routeGuard.privateAreas, moviesController.newMovie)
//create movie
router.post('/create', routeGuard.privateAreas, moviesController.newMovieForm)


//edit movie
router.get('/:movieID/edit', routeGuard.privateAreas, moviesController.editMovie)
//edit movie
router.post('/:movieID/edit', routeGuard.privateAreas, moviesController.editMovieForm)

//delete movie
router.post('/:movieID/delete', routeGuard.privateAreas, moviesController.deleteMovie)

//exportacion
module.exports = router