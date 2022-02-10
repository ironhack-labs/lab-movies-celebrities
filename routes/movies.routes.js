const router = require("express").Router();

const movieCtrl = require('../controllers/movies.controller');

router.get('/', movieCtrl.getMovies);

router.get('/create', movieCtrl.createMovies);

router.post('/create', movieCtrl.createMoviesForm);

module.exports = router;