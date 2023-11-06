const express = require('express')
const router = express.Router()

const Movie = require('./../models/movies.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/create',(req,res) => {
    Celebrity
        .find()
        .then(newCelebrity => {
            res.render('movies/new-movies', {newCelebrity})
        })
        .catch(err => console.log(err))
    
})

router.post('/create',(req, res) =>{
    const{title, genre, plot, cast} = req.body

    Movie
    .create({title, genre, plot, cast})
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
    Movie
    .find()
    .then(newMovie => {
        res.render('movies/movies', {newMovie})
    })
})

router.get('/:_id', (req, res) =>{
    const {_id} = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(newMovie => {
            res.render('movies/movie-details', newMovie)
        })
        .catch(err => console.log(err))
})

router.post('/:_id/delete', (req, res) =>{
    const { _id } = req.params

    Movie
        .findByIdAndUpdate(id)
        .then(() =>{
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res)=>{
    const { _id } = req.params

    Movie
        .findById(_id)
        .then(newMovie => {
            res.render('movies/edit-movie', { newCelebrities, newMovie})
      })
        .catch(err => console.log(err))
})

router.post('/:_id/edit', (req, res) => {

    const { _id } = req.params
    const {title, genre, plot, cast} = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect(`/movies/${id}`)
        })
        .catch(err => console.log(err))
})
