const router = require("express").Router();

//Require models
const Celebrity = require("../models/Celebrity.model");

const Movie = require('../models/Movie.model');


//1.Movie Create

//GET

router.get('/movies/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render("movies/new-movie.hbs", { celebrities }))
        .catch(err => console.log(err))

});

//POST

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie

        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => res.redirect('/movies'))

});

//2.Movie List

//GET
router.get('/movies', (req, res) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))


});

//3.Movie Details

//GET

router.get('/movies/:_id', (req, res) => {

    const { _id } = req.params


    Movie
        .findById(_id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))



})

//4.Delete Movies

//Post

router.post('/movies/:_id/delete', (req, res) => {

    const { _id } = req.params

    Movie
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})



//5.Edit Movies

//GET

router.get('/movies/:_id/edit', (req, res) => {

    const { _id } = req.params

    Movie
        .findById(_id)
        .populate('cast')
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))


    // Celebrity
    //     .find()
    //     .then(celebrities => res.render('movies/edit-movie', { celebrities }))
    //     .catch(err => console.log(err))

})

//POST

router.post('/movies/:_id/edit', (req, res) => {

    const { _id } = req.params

    const { title, genre, plot, cast } = req.body

    Movie

        .findByIdAndUpdate(_id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

});

module.exports = router;