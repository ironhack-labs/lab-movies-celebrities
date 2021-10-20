// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movies = require('../models/Movie.model')

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
        .then( (data) => {
            res.render('movies/new-movie', {allCeleb: data})
        })
        .catch(err => {
            console.log(`An error just occured: ${err}`)
        })
})

router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    Movies.create({ title, genre, plot, cast })
        .then( () => {
            res.redirect('/movies')
        })
        .catch( (err) => {
            console.log(`An error has occured: ${err}`)
        })
    
})


module.exports = router;
