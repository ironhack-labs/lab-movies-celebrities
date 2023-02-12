const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

router.get('/', (req, res) => {
    Movie
        .find()
        .populate('cast')
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log('You have an error: ', err))
})

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log('You have an error: ', err))

})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log('You have an error: ', err))
})


router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log('You have an error: ', err))
})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            movieUpdate = movie
            return Celebrity.find()
        })
        .then(celebrities => {
            movieUpdate.cast.forEach(elmMovie => {
                celebrities.forEach(elmCelebrity => {
                    if (elmMovie.name.includes(elmCelebrity.name)) {
                        let index = celebrities.indexOf(elmCelebrity)
                        celebrities.splice(index, 1)
                    }
                })
            })
            res.render('movies/edit-movie', { movie: movieUpdate, celebrities })
        })

        .catch(err => console.log(err))
})


//Primer intento, funcionaba bien pero me duplicaba a veces un elemento del array

// const finalObjet = { celebrities: undefined, movie: undefined }
// Celebrity
//     .find()
//     .then(celebrities => finalObjet.celebrities = celebrities)
//     .catch(err => console.log('You have an error: ', err))
// Movie
//     .findById(id)
//     .populate('cast')
//     .then(movie => {
//         finalObjet.movie = movie
//         finalObjet.celebrities.forEach(celebrity => {
//             finalObjet.movie.cast.forEach(cast => {
//                 if (celebrity.id.includes(cast.id)) {
//                     let index = finalObjet.celebrities.indexOf(celebrity)
//                     finalObjet.celebrities.splice(index, 1)
//                     return finalObjet
//                 }
//             })
//         })
//         console.log(finalObjet)
//         console.log(finalObjet.movie.cast)
//         res.render('movies/edit-movie', finalObjet)
//     }
//     )
//     .catch(err => console.log('You have an error: ', err))
// })

router.post('/:id/edit', (req, res) => {
    const { title, genre, plot, cast, id } = req.body
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies/${id}`))
        .catch(err => console.log('You have an error: ', err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log('You have an error: ', err))
})

module.exports = router;