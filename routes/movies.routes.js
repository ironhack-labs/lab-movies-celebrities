// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all your routes here
router.get('/create', (req,res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('movies/new-movie', {celebrities})
        })
        .catch(err => console.log(err))
})

router.post('/create', (req,res) => {
    const {title, genre, plot, cast} = req.body
    Movie
        .create({title, genre, plot, cast})
        .then(newMovie => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/', (req,res) => {
    Movie
        .find()
        .then(movies => {
            res.render('movies/movies', {movies})
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req,res) => {
    const {id} = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(details => {
            console.log(details)
            res.render('movies/movie-details', details)
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res, next) => {
    const {id} = req.params
    Movie
      .findByIdAndDelete(id)
      .then (deletedMovie => {
        res.redirect(`/movies`)
      })
      .catch(err => console.log(err))
  });

router.get('/:id/edit',(req, res) => {
    const {id} = req.params
    Movie
        .findById(id)
        .then(movieToEdit => {
            Celebrity
                .find()
                .then(celebritiesFromMovie => {
                    res.render('movies/edit-movie',{movieToEdit, celebritiesFromMovie})
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

})

router.post('/:id/edit',(req,res) => {
    const {id} = req.params
    const {title, genre, plot, cast} = req.body
    
    Movie
        .findByIdAndUpdate(id, {title, genre, plot, cast})
        .then(updatedMovie => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


module.exports = router;