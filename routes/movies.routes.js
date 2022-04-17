const router = require("express").Router();

const Movie = require('./../models/Movies.model')

const Celebrity = require('./../models/Celebrity.model')

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
})


router.get('/movies/:id', (req,res) => {

    const { id }= req.params

    Movie
        .findById(id)
        .populate('cast')
        .then( details => {

            res.render('movies/movie-details', details )

        })

})

router.post('/movies/:id/delete', (req, res) => {

    const { id }= req.params

    Movie
        .findByIdAndRemove(id)
        .then( () => {

            res.redirect('/movies')
        })

})

module.exports = router;