// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model');

router.get('/create', (req, res, next) => {
    const celebrities = req.body
    res.render('movies/new-movie', {celebrities})
})

/* router.post('', (req, res, next) => {

}) */
module.exports = router;