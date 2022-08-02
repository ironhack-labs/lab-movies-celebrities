// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/movies', (req, res, next) => res.render('routes/index.js')) 

router.get('/movies/create', (req, res, next) => res.render('movies/new-movie'));

router.post('/movies/create', (req, res, next) => {
    const { id } = req.body;
    Movie.create({Celebrity})
    .then((Movie) => {
        return Movie.create({id})
        res.redirect('/movies')
    })
    .catch((err) => res.render('movies/new-movie'));
})

module.exports = router;