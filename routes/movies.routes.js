// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movies.model')

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((dbCeleb) => {
        res.render('movies/new-movie', {dbCeleb});
    })
    .catch((err) => console.log(`Err while displaying post input page: ${err}`));
})
//celebrity post create new.

router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body;

    Movie.create({title, genre, plot, cast})
        .then(dbCeleb => {

           return Celebrity.findByIdAndUpdate(cast, { $push: {celeb: dbCeleb._id} })
        })

        .then (() => res.redirect('/movies'))
        .catch(error => console.log(error))
})

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(allMoviesFromDb => {
            res.render('movies/movies.hbs', { movies: allMoviesFromDb})
        })
        .catch(error => console.log('Error in list:', error))

})

module.exports = router;