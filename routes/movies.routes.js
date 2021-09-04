const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model');
const Movie = require('./../models/Movie.model');

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .select('name id')
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    
    if (title.length === 0 || genre.length === 0 || plot.length === 0) {
        res.render('movies/new-movie', { errorMsg: 'All fields must be completed' })
        return;
    }

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {
    Movie
        .find()
        .select('title')
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast') 
        .then(movie => res.render('movies/movie-details', { movie }))
        .catch(err => console.log(err))
})

router.get('/:id/delete', (req, res) => {
    const { id } = req.params
    console.log(id)
    Movie
        .findByIdAndRemove(id, (err, result) => { 
            if(err) console.log(err); 
            else console.log(result) 
           })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router;
