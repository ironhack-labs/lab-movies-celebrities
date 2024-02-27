const router = require('express').Router();
const moviesController = require('../controllers/movies.controller.js')

router.get('/movies', moviesController.list);

router.get('/movies/create', moviesController.create);

router.post('/movies/create', moviesController.doCreate);


module.exports = router;