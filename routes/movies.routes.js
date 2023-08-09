// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const movie = require('../controllers/movies.controllers')

router.get('/movies/new-movie', movie.create)
router.post('/movies/create', movie.doCreate)
router.get('/movies', movie.list)
router.get('/movies/:id', movie.details)
router.post('/movies/:id/delete', movie.delete)

module.exports = router;