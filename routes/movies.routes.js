const router = require("express").Router();
const Celebrity = require ("../models/Celebrity.model");
const Movie = require ("../models/Movie.model");

// all your routes here
router.get("/create", (req, res, next) => {
    Celebrity.find().then(allCelebrity => {
        res.render('movies/new-movies',{celebrity: allCelebrity})
    })
    
}) 

router.post("/create",(req, res, next) =>{
    const {title, genre, plot, cast} = req.body

    Movie
    .create({ title, genre, plot, cast})
    .then(() => res.redirect("/movies"))
    .catch(err => console.log('Error @ POST /craete:', err))
})  

router.get('/', (req, res, next) => {
    Movie
        .find()
        .then(allMovies => {
            res.render('movies/movies', {movie: allMovies})
        })
})

router.get('/:movieId', (req, res, next) => { 
    const { movieId } = req.params
    
    Movie
        .findById(movieId)
        .populate('cast')
        .then(movie => res.render('movies/movies-details', {movie}))
})

module.exports = router;