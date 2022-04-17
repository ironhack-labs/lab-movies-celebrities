const router = require("express").Router();

// all your routes here
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


router.get('/', (req, res) => {

    Movie
        .find()
        .then(movies => {
            res.render("movies/movies", { movies })
        })
        .catch(err => console.log(err))

})

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))


})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies")
        })
        .catch(err => {
            res.redirect("/movies/new-movie")
            console.log(err)
        })
})

router.get('/:id', (req, res) => {

    const { id } = req.params
    Movie
        .findById(id)
        .populate("cast")
        .then(movie => {
            res.render("movies/movie-details", movie)
        })
        .catch(err => console.log(err))

})

router.post('/:id/delete', (req, res) => {

    const { id } = req.params
    Movie
        .findByIdAndRemove(id)
        .then(movie => {
            res.redirect("/movies")
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
                .then(celebrities => {
                    celebrities.forEach(celebrity => celebrity.isPresent = false)
                    movie.cast.forEach(movieCeleb => {
                        celebrities.forEach(celebrity => {
                            if (celebrity.id == movieCeleb) celebrity.isPresent = true
                        })
                    })
                    res.render('movies/edit-movie', { movie, celebrities })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))




})

router.post('/:id/edit', (req, res) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies")
        })
        .catch(err => {
            res.redirect(`/movies/${id}`)
            console.log(err)
        })
})


module.exports = router;