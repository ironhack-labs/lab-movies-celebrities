// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('./../models/Movie.model')

/* GET Movies page */
router.get("/movies/create", (req, res) => res.render("./../views/movies/new-movie"))

/*POST Movies page*/

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(console.log('req.body =', [req.body]))
        .then(() => res.redirect('/movies/list'))
        .catch(err => console.log(err))
})
/*GET Movies list */
router.get('/movies/list', (req, res) => {

    Movie
        .find()
        .select('title')
        .then(movies => res.render('./../views/movies/movies', { movies }))
        .catch(err => console.log(err))
})
/*GET movie details*/
router.get('/movie/details', (req,res)=> {
    
    const { movie_id } = req.query

    console.log('movie id req',movie_id)
    Movie
        .findById(movie_id)
        .then(theMovie => res.render('./../views/movies/edit-movie', theMovie))
        .catch(err => console.log(err))})

module.exports = router;
