const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/', (req, res) => {

    Movie
        .find()
        .then(movies => {
            res.render('movie/movies', { movies })
        })
        .catch(err => console.log(err))




});
router.get('/new-movies', (req, res) => {
    Celebrity
        .find()
        .then(celebs => {
            res.render('movie/new-movie', { celebs })
            console.log(celebs)
        })
        .catch(err => console.log(err))
})

router.post('/new-movies', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create(req.body)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

});
router.get('/detalles/:id', (req, res) => {
    Movie
        .findById(req.params.id)
        .populate('cast')
        .then(movie => {
            res.render('movie/movie-details', { movie })
            console.log(movie)
        })
        .catch(err => console.log(err))
})
router.post('/detalles/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
});


///editar

router.get('/:id/edit', (req, res) => {

    const { id } = req.params
    
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movie/edit-movie', {movie})
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, req.body )
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


module.exports = router;