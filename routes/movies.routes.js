const router = require("express").Router();
const Movie = require('./../models/movie.model')
const Celebrity = require('./../models/Celebrity.model')
router.get('/', (req, res) => {
    Movie
        .find()

        .then(movie => res.render('movies/movies', { movie }))
        .catch(err => console.log('error on /movies rout', err))
})
router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrity => res.render('movies/new-movie', { celebrity }))
        .catch(err => console.log('error on /add rout', err))
})
router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie

        .create({
            title, genre, plot, cast
        })


        .then(() => res.redirect('/movies'))
        .catch((error) => {
            console.error(error); // Imprime el error en la consola para diagnóstico
            res.render('movies/new-movie', { error: "Hubo un error al crear la película." })
        })
})
router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log('ERROR retrieving movie details', err))

})

router.post('/:id/delete', (req, res) => {

    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log('ERROR deleting movie', err))

})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log('ERROR retrieving movie', err))
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log('ERROR updating movie', err))
})


module.exports = router