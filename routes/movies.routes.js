const express = require("express");
const Celebrity = require("./../models/Celebrity.model");
const router = require("express").Router();
const Movie = require("./../models/Movie"); //

// llamada para obtener las peliculas y las pinta en la URL movies/create (navegador)
router.get('/create', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })

})
// //llamada para crear peliculas para poner en la BBDD
router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie
        .create(req.body)
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => {
            console.log('error creating new movies' + err)
        })
})
router.get('/', (req, res, next) => {
    Movie
        .find()
        .then(movies =>
            res.render('movies/movies', { movies })
        );
});
router.get('/:id', (req, res, next) => {
    Movie
        .findById(req.params.id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.error(err));
});
router.post('/:id/delete', (req, res, next) => {
    Movie
        .findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.error(err));
});
router.get('/:id/edit', (req, res, next) => {
    Movie
        .findById(req.params.id)
        .then(() => res.redirect('/movies/edit-movie'))
        .catch(err => console.error(err));
});
router.get('/:id/edit', (req, res, next) => {
    Celebrity
        .find()
        .then(() => res.render('/movies/edit-movie'))
        .catch(err => console.error(err));
});
// router.post('/:id/', (req, res, next) => {
//     Movie
//         .findByIdAndUpdate(req.params.id)

//         .then(() => res.render('/movies/edit-movie'))
//         .catch(err => console.error(err));
// });

module.exports = router;












