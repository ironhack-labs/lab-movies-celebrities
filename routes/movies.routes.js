// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const MovieModel = require('../models/Movie.model')

// all your routes here

//GET
router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie.hbs')
});

//POST
router.post('/movies/create', (req,res, next) => {
 
    const {title,genre,  plot, cast } = req.body

    MovieModel.create({title,genre,  plot, cast })

        .then((movie)=> {
            res.redirect('movies/movies.hbs', {movie})
        })
        .catch(()=> {
            res.render('movies/new-movie.hbs')
        })

});
router.get('/movies', (req, res, next) => {
    
    MovieModel.find()
        .then((movie)=> {
            res.render('movies/movies.hbs',{movie})
        })
        .catch((err)=> {
            next(err)
        })
    
});


router.get('/movies/:id', (req, res, next) => {
    let dynamicMovieId = req.params.id
        MovieModel.findById(dynamicMovieId)
            .then((movie) => {
                res.render('movies/movie-details',{movie})
            })
            .catch(()=> {
                next('failed to find movie id')
            })
              
})



router.post ('/movies/:id/delete', (req, res, next) => {
    let dynamicMovieId = req.params.id
        MovieModel.findByIdAndRemove(dynamicMovieId)
            .then((movie) => {
                res.redirect('movies/movies.hbs',{movie})
            })
            .catch(()=> {
                next('failed to find movie id')
            })
              
})



router.get ('/movies/:id/edit', (req,res,next)=>{
    let dynamicMovieId = req.params.id
    MovieModel.findById(dynamicMovieId)
    .then((movie)=>{
        res.render('movies/edit-movies',{movie})
    })
    .catch(()=>{
        next('failed to find movie id')
    })
    
})



module.exports = router;
