

const Celebrity = require('../models/Celebrity.model');
const { findByIdAndDelete } = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model')

const router = require("express").Router();

router.get('/movies', (req, res, next) => {
    Movie
    .find()
    .then(movies => {
      console.log(movies)
      res.render("movies/movies", { movies });
      
  })
 .catch(err=>console.log(err))
});


router.get('/new-movie', (req, res, next) => {
    Celebrity
        .find()
        .then((cast => {
            res.render('movies/new-movie', {cast})
        }))
   
})

router.post('/new-movie', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create(req.body)
        .populate('Celebrity')
        .then(movie => res.redirect('/movies'))
    
        .catch(err=>console.log(err))

})


router.get('/movies/movie-details/:movie_id', (req, res, next) => {

  const { movie_id } = req.params

  Movie
    .findById(movie_id)
    .then(movie => {
      res.render('movies/movie-details', movie)
    })
    .catch(err => console.log(err))
    

})


router.post('/movies/:movie_id/delete', (req, res, next) => {
    const { movie_id } = req.params
    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
    .catch(err=>console.log(err))
})
    

router.get('/movies/:id/edit', (req, res, next) => {
   
    const { id } = req.params
    Movie
        .findById(id)
        .then(movie => {
            res.render('movies/edit-movie',movie)
             .catch(err=>console.log(err))
    })
    
})

router.post('/movies/:id/edit', (req, res, next) => {
    const{title,genre,plot,cast}=req.body
    const { id } = req.params
    Movie
        .findByIdAndUpdate(id, { title,genre,plot,cast })
        .then(() => res.redirect('/movies'))
     .catch(err => console.log(err))
})
module.exports = router;



