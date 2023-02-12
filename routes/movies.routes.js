const router = require("express").Router()
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')




router.get('/', (req, res) => {

    Movie
        .find()
        .sort({ title: 1 })
        .populate('cast', 'Celebrity')
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {


    Celebrity
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(celebrities => res.render('movies/new-movie.hbs', { celebrities }))
        .catch(err => console.log(err))

})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(() => res.render('movies/new-movie'))
})


router.get('/details/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast', 'name')
        .then(movies => res.render('movies/movies-details', movies))
        .catch(err => console.log(err))
})

router.post('/delete/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})


router.get('/edit/:id', (req, res) => {
    const { id } = req.params

    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => {

            Movie
                .findById(id)
                .populate('cast', 'name')
                .then(movies => res.render('movies/edit-movie.hbs', { movies, celebrities }))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post('/edit/:id', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .populate('cast', 'name')
        .then(movies => res.render('movies/movies-details', movies))
        .catch(err => console.log(err))
})

module.exports = router
