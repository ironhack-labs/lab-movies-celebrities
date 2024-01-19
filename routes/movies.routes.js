const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model')

router.get('/', (req, res) => {
    Movie
    .find()
    .then(movies => {
        res.render('movies/movies', { movies })
    })
    .catch(err =>{
        console.log(err)
    })
})

router.get('/create', (req, res) => {
    Celebrity
    .find()
    .then(cast=>{
        res.render('movies/new-movie', { cast });
    })
});

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie
    .create({title, genre, plot, cast})
    .then(()=>{
        res.redirect('/movies')
    })
    .catch(err =>{
        console.error(err)
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Movie
    .findById(id)
    .populate('cast')
    .then(details => {
        res.render('movies/movie-details', details)
    })
    .catch(err =>{
        console.error(err)
    })
})

router.post('/:id/delete', (req, res)=>{
    const { id } = req.params
    Movie
    .findByIdAndRemove(id)
    .then(()=>{
        res.redirect('/movies')
    })
    .catch(err =>{
        console.error(err)
    })
})

router.get('/:id/edit', (req, res)=>{
    const { id } = req.params

    Movie
    .findById(id)
    .then(async details =>{
        const celebrities = await Celebrity.find()
        res.render('movies/edit-movie', {details, celebrities})
    })
    .catch(err =>{
        console.error(err)
    })
})

router.post('/:id/edit', (req, res)=>{
    const { id } = req.params
    const { title, genre, plot, cast } = req.body;
    Movie
    .findByIdAndUpdate(id, { title, genre, plot, cast })
    .then((data)=>{
        res.redirect(`/movies/${data._id}`)
    })
    .catch(err =>{
        console.error(err)
    })
})

module.exports = router;