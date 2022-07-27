const router = require('express').Router();

// CONTROLLERS
const moviesController = require('../controllers/movies.controller');

// LIST OF MOVIES
router.get('/movies', moviesController.list);

// ADD NEW MOVIES
router.get('/movies/create', moviesController.create);
router.post('/movies/create', moviesController.doCreate);

// MOVIE DETAIL 
router.get('/movies/:id', moviesController.detail);

// DETELE MOVIE
router.post('/movies/:id/delete', moviesController.delete);

// EDIT MOVIE
router.get('/movies/:id/edit', moviesController.edit);
router.post('/movies/:id/edit', moviesController.doEdit);

// EXPORT ALL THE ROUTES
module.exports = router;