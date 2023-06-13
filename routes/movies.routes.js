const router = require("express").Router();
const Celebrity = require ("../models/Celebrity.model");
const Movie = require ("../models/Movie.model");

// all your routes here
router.get("/create", (req, res, next) => {
    Celebrity.find().then(allCelebrity => {
        res.render('movies/new-movie',{celebrity: allCelebrity})
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
        .then(movie => res.render('movies/movie-details', {movie}))
})

router.post('/:movieId/delete',(req, res, next) =>{
    const { movieId } = req.params
    
    Movie
    .findByIdAndDelete(movieId)
    .then(movie => res.redirect('/movies'))
    .catch(err => console.log('Error @ POST /delete', err))
})

router.get('/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params
    
    Movie
        .findById(movieId)
        .populate('cast')
        .then((movie) => {
            // @ts-ignore
            const { cast } = movie
            
            Celebrity
                .find({ _id: { $nin: cast } })
                .then(celebrities => {
                    res.render('movies/edit-movie.hbs', { movie, celebrity: celebrities})
                })
                .catch(err => console.log('ERROR @ GET movies/:movieID/edit: ', err))
        })
})

router.post('/:movieId/edit', (req, res, next) => { 
    const { movieId } = req.params

    Movie.findById(movieId)
        .then(movieParams => {
            let { title, genre, plot, cast } = req.body

            if (!title) title = movieParams?.title
            if (!genre) genre = movieParams?.genre
            if (!plot) plot = movieParams?.plot
            if (!cast) cast = movieParams?.cast

            Movie.
                findByIdAndUpdate(movieId, { title, genre, plot, cast })
                .then(() => res.redirect('/movies'))
                .catch(err => console.log('ERROR @ POST movies/:movie/edit: ',err))
        })
})

module.exports = router;