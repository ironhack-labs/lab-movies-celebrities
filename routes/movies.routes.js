// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('./movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('./movies'))
        .catch(err => console.log(err))
})

router.get('/movies', (req, res) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res) => {
    const { _id } = req.params
    Movie
        .findById(_id)
        .sort({ title: 1 })
        .populate('cast', 'name')
        .then(movies => {
            Celebrity
                .find()
                .select({ name: 1 })
                .sort({ name: 1 })
                .then(celebrityArr => {
                    movie.cast.forEach(movieElement => {
                        celebrityArr.forEach(celebrityElement => {
                            if (movieElement.name.includes(celebrityElement.name)) {
                                let element = celebrityArr.indexOf(celebrityElement)
                                celebrityArr.splice(element, 1)
                            }
                        })

                    });

                    res.render('/movies/edit-movie', { movies, celebrityArr })

                })
        })
        .catch(err => console.log(err))
})

module.exports = router;