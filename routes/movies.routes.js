const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


router.get('/create', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrities => res.render("movies/new-movie", { celebrities }))
        .catch(err => console.log(err))


})

router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movie => res.redirect("/movies/movies"))
        .catch(err => res.render("movies/new-movie"))
})


router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})


router.get('/movies/:movie_id', (req, res, next) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => res.render("movies/movie-details", movie))
        .catch(err => console.log(err))
})


router.post('/movies/:movie_id/delete', (req, res, next) => {

    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect(`/movies/movies`))
        .catch(err => console.log(err))
})


router.get('/movies/:movie_id/edit', (req, res, next) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebrity => res.render(`movies/edit-movie`, { celebrity, movie },))

        })
        .catch(err => console.log(err))
})

router.post('/movies/:movie_id/edit', (req, res, next) => {
    const { movie_id } = req.params
    const { title, genre, plot, cast } = req.body


    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(movie => res.redirect(`/movies/movies/${movie_id}`))
        .catch(err => console.log(err))

})



module.exports = router;