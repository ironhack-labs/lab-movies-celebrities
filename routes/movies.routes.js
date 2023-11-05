const router = require("express").Router()

module.exports = router
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')


router.get('/', (req, res) => {


    Movie
        .find()
        .populate('cast')
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(movie => res.redirect('/movies'))
        .catch(err => console.log(err))
})



router.get('/details/:movie_id', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie =>
            res.render('movies/movie-details', movie)

        )
        .catch(err => console.log(err))
})


router.post('/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

// router.get('/:movie_id/edit', (req, res) => {
//     const { movie_id } = req.params

//     Movie
//         .findById(movie_id)
//         .then(movie => {
//             Celebrity
//                 .find()
//                 .then(celebrities => {
//                     res.render('movies/edit-movie', { celebrities, movie })
//                     console.log(movie)
//                 })
//                 .catch(err => console.log(err))
//         })
//         .catch(err => console.log(err))
// })

// router.post('/:movie_id/edit', (req, res) => {
//     const { title, genre, plot, cast } = req.body
//     const { movie_id } = req.params

//     Movie
//         .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
//         .then(movie_id => { res.redirect('/') })
//         .catch(err => console.log(err))
// })

router.get('/:movie_id/edit', (req, res) => {
    const { movie_id } = req.params
    Celebrity
        .find()
        .then(Celebrity => {
            Movie
                .findById(movie_id)
                .then(movie_id => {
                    res.render('movies/edit-movie', movie_id)


                })
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))


})

router.post('/:movie_id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params
    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(movie => res.redirect(`/movies`))
        .catch(err => console.log(err))

})