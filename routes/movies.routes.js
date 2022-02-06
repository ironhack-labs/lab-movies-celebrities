// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here
router.get('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .find(name, occupation, catchPhrase)
        .then(celebrity => {
            res.render("movies/new-movie", { celebrity })
        })
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch((err) => console.log(err))

})

router.get('/', (req, res) => {
    Movie
        .find()
        .then(movies => res.render("movies/movies", { movies }))
        .catch(err => console.log(err))
})

router.get('/details/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movies => res.render("movies/movie-details", { movies }))
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect("/movies"))
        .catch(err => console.log(err))
});

router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movies => {
            Celebrity
                .find().then(celebrities => {
                    res.render('movies/edit-movie', { movies, celebrities })
                })
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(res.redirect(`/movies/${id}/edit`))
        .catch(err => console.log(err))
})


module.exports = router;