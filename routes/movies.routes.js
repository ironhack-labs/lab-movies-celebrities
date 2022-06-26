const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

const router = require("express").Router();

router.get('', (req, res) => {
    Movie
        .find()
        .then(moviesData => {
            res.render('movies/movies', { moviesData })
        })
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    console.log('Aqui estoy')
    Celebrity
        .find()
        .select({ id: 1, name: 1 })
        .then(celebritiesInfo => {
            res.render('movies/new-movie', { celebritiesInfo })
        })
        .catch(err => console.log(err))

})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    console.log({ title, genre, plot, cast })

    Movie
        .create({ title, genre, plot, cast })
        .then(movies => res.redirect('/movies'))
        .catch(err => console.log(err))


})

router.get('/:id', (req, res) => {
    const { id } = req.params


    Movie
        .findById(id)
        .populate('cast')
        .then(movieData => {
            console.log(movieData)
            res.render('movies/movie-details', movieData)

        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {

    const { id } = req.params


    Movie
        .findById(id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebData => {

                    res.render('movies/edit-movie', { movie, celebData })
                })
        })

        .catch(err => console.log(err))

});

router.post('/:id/edit', (req, res) => {




});

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))


});



// all your routes here

module.exports = router;