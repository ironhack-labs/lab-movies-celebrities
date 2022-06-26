const router = require("express").Router()

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')



//List all the movies name
router.get('/', (req, res) => {

    Movie
        .find()
        .select({ title: 1 })
        .then(movies => {

            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})


//Create a new movie
router.get('/createMovie', (req, res) => {
    // res.render('movies/new-movie')

    Celebrity
        .find()
        .then(celebrity => {
            console.log(celebrity)
            res.render('movies/new-movie', { celebrity })
        })
        .catch(err => console.log(err))
})

router.post('/createMovie', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create(req.body)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log('Error'))
})


//Details
router.get('/:movie_id', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

//Delete

router.post('/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params
    Movie
        .findByIdAndDelete(movie_id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log('ERROR'))
})

//Edit
router.get('/:movie_id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebrity => {
                    res.render('movies/edit-form', { movie, celebrity })

                })
                .catch(err => console.log('ERROR'))

        })
        .catch(err => console.log('ERROR'))

})

router.post('/:movie_id/edit', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(movie => res.redirect('/movies'))
        .catch(err => console.log('Error'))
});


module.exports = router