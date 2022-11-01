const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

// all your routes here
// Create movie
router.get('/movies/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('movies/new-movie', { celebrities }); 
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/movies/create', async (req, res, next) => {
    
    const {title, genre, plot, cast} = req.body;
    
    try {
        const createdMovie = await Movie.create({title, genre, plot, cast});
        res.redirect('/movies');
    } catch (error) {
        res.render('movies/new-movie');
        console.log(error); 
    }
});

// List all movies
router.get('/movies', async (req, res, next) => {
 
    try {
        const movies = await Movie.find();
        res.render('movies/movies', { movies });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/movies/:id', async (req, res, next) => {
    
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id).populate('cast');
    
        res.render('movies/movie-details', { movie });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/movies/:id/delete', async (req, res, next) => {
    const { id } = req.params;

    try {
        await Movie.findByIdAndRemove(id);

        res.redirect('/movies')

    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/movies/:id/edit', async (req, res, next) => {
    const { id } = req.params;

    try {
        const updatedMovie = await Movie.findById(id);
        const allCeleb = await Celebrity.find();

        res.render('movies/edit-movie', {updatedMovie, allCeleb});

    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/movies/:id/edit', async (req, res, next) =>{
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    try {
        const updateMovie = await Movie.findByIdAndUpdate(id, {title, genre, plot, cast});

        res.redirect(`/movies/movie-details/${updateMovie._id}`);
    } catch (error) {
        console.log(error);
        next(error);
    }
})


module.exports = router;