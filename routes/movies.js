const router = require("express").Router()

const Movies = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then((celebrities) => res.render('movies/new-movies', { celebrities }))
        .catch((err) => console(err))

})


router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body


    Movies
        .create({ title, genre, plot, cast })

        .then(() => res.redirect('/movies'))
        .catch((err) => console.log(err))


})

router.get('/movies', (req, res) => {

    Movies
        .find()
        .then((movies) => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})



router.get('/:_id', (req, res) => {

    const { _id } = req.params

    Movies
        .findById(_id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))

})

router.post('/:_id/delete', (req, res) => {

    const { _id } = req.params

    Movies
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})



router.get('/:_id/edit', (req, res) => {

    const { _id } = req.params
    console.log("Pasa por aqu123i")
    Promise.all([
        Movies.findById(_id),
        Celebrity.find()
    ])
        // .populate('cast')
        .then(([movie, celebrities]) => {
            res.render('movies/edit-movie', { movie, celebrities })

        })
        .catch(err => console.error(err))
})

router.post('/:_id/edit', (req, res) => {
    console.log("Pasa por aqui")

    const { cast, title, genre, plot, } = req.body
    const { _id } = req.params


    Movies
        .findByIdAndUpdate(_id, { cast, title, genre, plot, })
        .then(() => res.redirect(`/movies/${_id}`))
        .catch((err) => console.log(err))



})









module.exports = router