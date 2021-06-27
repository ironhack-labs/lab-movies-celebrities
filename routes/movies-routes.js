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
router.get('/movie/details/:movie_id', (req, res) => {

    const { movie_id } = req.params


    Movie
        .findById(movie_id)
        // .then(themovie => console.log('themovie', themovie)) 
        .populate('cast')
        .then(theMovie => res.render('movies/movie-details', theMovie))
        .catch(err => console.log(err))
})
/*POST movie delete */
router.post('/movies/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params
       
    Movie    
        .findByIdAndRemove(movie_id)
        .then(movies => res.redirect('/movies/list'))
})


/*GET movie edit */
router.get('/movie/edit', (req, res) => {

    const { movie_id } = req.query

    Movie
        .findById(movie_id)
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))
})






module.exports = router;
/**
Iteration #9: Deleting Movies

In the route:
Use the Movie model's findByIdAndRemove() method to delete the specific movie by its id.
If everything is good (.then()), redirect to the list of movies page
If there's an error, catch it */