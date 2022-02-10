const router = require("express").Router();

const movieCtrl = require('../controllers/movies.controller');

router.get('/', movieCtrl.getMovies);

router.get('/create', movieCtrl.createMovies);

router.post('/create', movieCtrl.createMoviesForm);

router.get('/:id', movieCtrl.getMovie);

router.get('/:id/edit', movieCtrl.editMovie);

router.post('/:id/edit', movieCtrl.editMovieForm);

router.post('/:id/delete', movieCtrl.deleteMovie)

module.exports = router;