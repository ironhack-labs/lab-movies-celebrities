const router = require("express").Router();
const moviesModel = require('../models/movieModel')
const celebModel = require('../models/Celebrity.model');

router.get('/movie', (req, res, next) => {
    // console.log(req.body)
    moviesModel.find()
        .then((found) => {
            return found
        })
        .then((movies) => res.render('../views/movies/movies', { movies }))
        .catch((err) => next(err))
})

router.get('/movie/create', (req, res, next) => {
    celebModel.find()
    .then((found) => {
        return found
    })
    .then((celebs)=> res.render('../views/movies/new-movie',{celebs}))
    .catch((err) => next(err))
})

router.post('/movie/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    moviesModel.create({ title, genre, plot, cast  })
        .then(() => {
            res.redirect('/movie')
        })
        .catch(() => res.render('../views/movies/movies'))
});

router.get('/movie/:id/', (req, res, next) => {
    moviesModel.findById(req.params.id)
    .populate("cast")
    .then((movie) =>{
    //   console.log(JSON.stringify(movie))
    res.render('../views/movies/movie-details', movie)
    })
  });

module.exports = router;