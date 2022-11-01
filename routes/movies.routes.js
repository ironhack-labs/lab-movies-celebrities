const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');


router.get("/movies", async (req, res, next) => {
    try { 
        const movieList = await Movie.find();
        res.render("movies/movies", {movieList});
        console.log(movieList);   
     
}   catch (error) {
    console.log(error);
    next(error);
}
})

router.get('/movie-create', async (req, res, next) => {
    try { 
        const allCelebrities = await Celebrity.find();
        res.render ('movies/new-movie', {allCelebrities})
     
    } catch (error) {
    console.log(error);
    next(error);
    }});

router.post('/movie-create', async (req, res, next) => {
    try {
    const {title, genre, plot, cast} = req.body;
    
    const newMovie = await Movie.create({title, genre, plot, cast});

    res.redirect('/movies');

} catch (error) {
    console.log(error);
    next(error);
}
})

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

module.exports = router;