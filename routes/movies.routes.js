// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const sessionInfo = require('../middleware/sessionInfo')

const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/create', sessionInfo, (req, res) => {
    Celebrity.find()
    .then((celebList) => res.render('./movies/new-movies', {celebList}))
})

router.post('/create', (req, res)=>{
    
    const { title, genre, plot, cast } = req.body
  
    Movie.create( {title, genre, plot, cast} )
    .then( () => {
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(err);
      res.render('new-movies')
    })
  })

router.get('/', (req, res) => {
    Movie.find()
    .then((movieList) => res.render('./movies/movies', {movieList}))
})

router.get('/:id', sessionInfo, (req, res) => {
    const id = req.params.id

    Movie.findById(id)
    .populate(user('./movies/movie-details', foundMovie))
})

router.post('/:id', (req, res) => {
    const id = req.params.id

    const { title, genre, plot, cast } = req.body

    Movie.findByIdAndUpdate(id, {title, genre, plot, cast} )
    .then( () => {
        res.redirect('/movies');
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/movies');
    })
})


router.post('/:id/delete', (req, res)=>{
    
    const id = req.params.id

    Movie.findByIdAndRemove(id)
    .then( () => res.redirect('/movies'))
    .catch((err) => {
      console.log(err);
      res.render('movies')
    })
  })


router.post('/:id/edit', (req, res)=>{

    const id = req.params.id
    
    Movie.findById(id)
    .then( (movie) => {
        Celebrity.find()
        .then((celebs) => {
            const allData = {movie, celebs}
            res.render('./movies/edit-movie', allData)
        })
    })
    .catch((err) => {
        console.log(err);
        res.render('movies')
    })
})





module.exports = router;