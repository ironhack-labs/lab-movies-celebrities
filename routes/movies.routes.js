const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


router.get('/movies/create', (req, res,) => {
    Celebrity
        .find()
        .then(Celebrity => res.render('movies/new-movie', { Celebrity }))
        .catch(err => console.log(err))



});


router.post('/movies/create', (req, res,) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

});



router.get('/movies', (req, res,) => {

    Movie
        .find()
        .then(eachMovie => res.render('movies/movies', { eachMovie }))
        .catch(err => console.log(err))



});

router.get('/movies/:_id', (req, res) => {

    const { _id } = req.params

    Movie


        .findById(_id)
        .populate("cast")
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})


router.post('/movies/:movie_id/delete', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})










router.get('/movies/:movie_id/edit', (req, res) => {




    const { movie_id } = req.params

    Movie

        .findById(movie_id)
        .then(movies => res.render('movies/edit-movie', movies))
        .catch(err => console.log(err))

    // Celebrity
    //     .find()
    //     .then(celebrity => res.render('movies/edit-movie', celebrity))
    //     .catch(err => console.log(err))



})


// router.post('/movies/:movie_id/delete', (req, res) => {

//     const { movie_id } = req.params

//     Movie
//         .findByIdAndDelete(movie_id)
//         .then(() => res.redirect(`/movies`))
//         .catch(err => console.log(err))
// })



module.exports = router;