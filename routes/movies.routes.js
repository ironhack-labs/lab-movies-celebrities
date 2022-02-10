const router = require("express").Router();

const movieCtrl = require('../controllers/movies.controller');

router.get('/', movieCtrl.getMovies);

router.get('/create', movieCtrl.createMovies);

router.post('/create', movieCtrl.createMoviesForm);

router.get('/:id', movieCtrl.editMovie);

router.post('/:id', movieCtrl.editMovieForm);

module.exports = router;