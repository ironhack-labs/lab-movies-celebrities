const router = require("express").Router();
const Movie = require("./../models/Movies.model")
// all your routes here
router.get("/movies/create", (req, res) => { res.render("./../views/movies/new-movie"); });

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies/list'))
        .catch(err => console.log(err))

})
router.get('/movies/list', (req, res) => {


    Movie
        .find()
        .select('title')
        // .select('occupation')
        // .select('catchPhrase')
        // .then(elem => { console.log('name') })
        // .then(movies => res.render("./../views/movies/movies", { movies }))
        .then(movies => console.log(movies))
        .catch(err => console.log(err))

})

module.exports = router;