// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here

route.post(':d/delete', (req,res) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.get('/:id', (req,res) => {
    Movie.findById(req.params.id)
    .populate('cast')
    .then(movieDetails => {
        res.render('movie-details', movieDetails)})
    .catch(err => console.log(err));
});

router.get('/create', (req,res) => {
    Celebrity.find()
    .then(allCelebs => {
        res.render('new-movie', {allCelebs});
    })
    
});

router.post('/create', (req,res) => {
    const { title, genre, plot, cast } = req.body;
    console.log('line 18',req.body)
    Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect('/movies'));
});

router.get('/', (req,res) => {
    Movie.find()
    .populate("cast")
    .then(allMovies => {
        res.render('movies', {allMovies});
    }); 
});


module.exports = router;