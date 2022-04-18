const router = require("express").Router()

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')



// ---------> MOVIE CREATION <---------
router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrity => {
            res.render('movies/new-movie', { celebrity })
        })
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create(req.body)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})



// ---------> MOVIE READING <---------
router.get('/', (req, res) => {

    Movie
        .find()
        .then(allMovies => {
            res.render('movies/movies', { allMovies })
        })
        .catch(err => console.log(err))

})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(selectedMovie => {
            res.render('movies/movie-details', selectedMovie)
        })
        .catch(err => console.log(err))

})



// ---------> MOVIE DELETE <---------
router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

})



// ---------> MOVIE EDIT <---------
router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .then((selectedMovie) => {

            Celebrity
                .find()
                .then(allCelebs => {
                    console.log(allCelebs)
                    const necessaryInfo = [selectedMovie, allCelebs]

                    res.render('movies/edit-movie', { necessaryInfo })
                })
                .catch(err => console.log(err))
        })


        // .then(selectedMovie => {
        //     const necessaryInfo = [selectedMovie, Celebrity.find()]
        //     console.log(necessaryInfo[1])
        //     return necessaryInfo
        // })
        // .then(necessaryInfo => {
        //     res.render('movies/edit-movie', { necessaryInfo })
        // })
        .catch(err => console.log(err))

})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body


    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})



module.exports = router