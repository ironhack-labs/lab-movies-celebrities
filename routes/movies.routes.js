const express = require('express');
const router = express.Router();

// require the Movie model here
const Movie = require("../models/Movie.model");
const Celeb = require("../models/Celebrity.model");


//List
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(movies =>{
        res.render('movies/movies', {movies})
    })
    .catch(err => {
        console.log(err)
        res.send('Error')
    })
});

//Create
router.get('/movies/create', (req, res, next) => {
    Celeb.find()
        .then(celebs => {
            res.render('movies/new-movie', {celebrities: celebs});
        })
        .catch(err => {
            console.log(err)
            res.send('Error')
        })
});

router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast, ... rest} = req.body
    Movie.create({title, genre, plot, cast})
    .then(movie => {
        res.redirect('/movies')
    })
    .catch(err => {
        console.log(err)
        res.send('Error')
    })
});

//Details
router.get('/movies/:id', (req, res, next) => {
    const {id} = req.params;
    Movie.findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => {
            console.log(err)
            res.send('Error')
        })
})

//Delete
router.get('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params;
    Movie.findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => {
            console.log(err)
            res.send('Error')
        })
});


//Edit
router.get('/movies/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Movie.findById(id)
        .then(movie => {
            Celeb.find()
                .then(celebs => {
                    res.render('movies/edit-movie', {
                        movie: movie,
                        celebrities: celebs
                    })
                })
                .catch(err => {
                    console.log('Error en celeb: ', err)
                    res.send('Error')
                })
        })
        .catch(err => {
            console.log('Error en movie: ',err)
            res.send('Error')
        })
});


router.post('/movies/:id/edit', (req, res, next) => {
        const {id} = req.params;
        const {title, genre, plot, cast,... rest} = req.body;
        Movie.findByIdAndUpdate(id, {title, genre, plot, cast},{new: true})
            .then(movie=>{
                res.redirect(`/movies/${id}`);
            })
            .catch(err => {
                console.log(err)
                res.send('Error')
            })
});

module.exports = router;