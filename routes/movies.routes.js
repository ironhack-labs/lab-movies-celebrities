const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')



router.get('/', (req, res, next) => {
    Movie
        .find()
        .populate('cast')
        .then(movies => res.render('movies/movies.hbs', { movies }))
        .catch(err => console.log(err))
});


router.get('/create', (req, res) => {
    Celebrity
        .find()
        // .populate('cast')
        .then(celebrity => {
            res.render('movies/new-movie', { celebrity })
        })
        .catch(err => console.log(err))

})
router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create(req.body)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))


})

router.get('/:id', (req, res, next) => {

    Movie
        .findById(req.params.id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))



})

router.post('/:id/delete', (req, res, next) => {

    Movie
        .findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))



});

router.get('/:id/edit', (req, res, next) => {

    Movie
        .findById(req.params.id)
        .populate('cast')
        .then(movie => {
            res.render('movies/edit-movie', movie)
        })
        .catch(err => console.log(err))



});

router.post('/:id/edit', (req, res, next) => {

    Movie
        .findByIdAndUpdate(req.params.id, req.body)
        .then(movie => res.redirect('/movies'))
        .catch(err => console.log(err))

});




module.exports = router;