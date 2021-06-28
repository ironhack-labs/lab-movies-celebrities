const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get('/', (req, res, next) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/registrar', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
})

router.post('/registrar', (req, res) => {

    const { title, genre, plot, cast, image } = req.body

    Movie

        .findOne({ title })
        .then(title => {

            if (title) {
                res.render('movies/new-movie', { errorMessage: 'Pelicula  ya registrada' })
                return
            }
            Movie
                .create({ title, genre, plot, cast, image })
                .then(() => res.redirect('/movies'))

        })

        .catch(err => console.log(err))
})

router.get('/detalles/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movies => res.render('movies/movie-details', movies))
        .catch(err => console.log(err))
})

router.get('/:movie_id/editar', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(movies => res.render('movies/edit-movie', movies))

        .catch(err => console.log(err))


})


router.post('/:movie_id/editar', (req, res) => {

    const { movie_id } = req.params
    const { title, genre, plot, celebrity, image } = req.body

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, celebrity, image })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/borrar/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findByIdAndRemove(movie_id)
        // .populate('celebrity.model')
        .then(movies => res.render('movies/movies', movies))
        .catch(err => console.log(err))
})
module.exports = router;