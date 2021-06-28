// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebrityModel = require('../models/Celebrity.model')
const movieModel = require('../models/Movie.model')



router.get('/movies/create', (req,res, next) => {
    celebrityModel.find()
    .then((celebs) => {
       res.render('movies/new-movies.hbs', {celebs}) 
    })
    .catch(() => {
        
    })  
})


router.post('/movies/create', (req, res, next) => {
    const {title,genre, plot, cast } = req.body
    movieModel.create({title,genre, plot, cast})
    .then(() => {
        res.redirect('/movies')
    })
    .catch(() => {
        res.render('movies/new-movies.hbs')
    })   
})


router.get('/movies', (req,res, next) => {
    movieModel.find()
    .then((movies) => {
        res.render('movies/movies.hbs', {movies})
    })
    .catch(() => {
        next("Movies fetch failed")
    })

})


router.get('/movies/:id', (req,res, next) => {
    const {id} = req.params
    movieModel.findById(id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/movie-details.hbs', {movie})
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/movies/:id/delete', (req,res, next) => {
    const {id} = req.params
    movieModel.findByIdAndRemove(id)
    .then(() => {
        res.redirect('/movies')
    })
    .catch((err) => {
        next(err)
    })
});

router.get('/movies/:id/edit', (req,res, next) => {
    const {id} = req.params;
    console.log("first call call")
    movieModel.findById(id)
    .populate('cast')
    .then((movie) => {
        celebrityModel.find()
        .then((celebs) => {
           res.render('movies/edit-movie.hbs', {movie, celebs})
           console.log(movie)   
        })
        .catch((err) => {
            next(err)
        })
    // return movie, celebrityModel.find()
    })
    .catch((err) => {
        console.log("Ctchhhhhhhh")
        next(err)
    })
})



router.post('/movies/:id/edit', (req,res,next) => {
    const {id} = req.params
    const {title,genre, plot, cast } = req.body
    movieModel.findByIdAndUpdate(id, {title,genre, plot, cast})
    .then(() => {
        res.redirect(`/movies/${id}`)
    })
    .catch((err) => {
        next(err)
    })   
})

module.exports = router;