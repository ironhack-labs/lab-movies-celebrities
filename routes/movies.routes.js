const router = require("express").Router();

const Movie = require('./../models/Movies.model')

const Celebrity = require('./../models/Celebrity.model');
const { findById } = require("./../models/Movies.model");

router.get('/movies/create', (req,res) => {
    
    Celebrity
        .find()
        .then(actors => {

       
            res.render('movies/new-movie', {actors})
         })

         .catch(err => res.send(err))


})

router.post('/movies/create', (req, res) =>{

    const {title, genre, plot, cast} = req.body 

    Movie
        .create({title, genre, plot, cast})
        .then(createMovie => {
            res.redirect('/movies')
        })

})


router.get('/movies', (req, res)=> {

    Movie
        .find()
        .then(film => {

            res.render('movies/movies', {film})
        })
        .catch(err => res.send('error en movies.routes.js(get)',err))
})


router.get('/movies/:id', (req,res) => {

    const { id }= req.params

    Movie
        .findById(id)
        .populate('cast')
        .then( details => {

            res.render('movies/movie-details', details )

        })
        .catch(err => console.log(err))

})

router.post('/movies/:id/delete', (req, res) => {

    const { id }= req.params

    Movie
        .findByIdAndRemove(id)
        .then( () => {

            res.redirect('/movies')
        })
        .catch(err => console.log(err))

})

router.get('/movies/:id/edit',(req,res)=> {

    const { id } = req.params

    Movie
        .findById(id)
    
})

module.exports = router;