const router = require("express").Router();
const Movie = require('../models/Movie.model');

// all your routes here

router.get('/create', (req, res, next) => { //!ROUTE
    res.render('movies/new-movie'); //!VIEW
})

router.post('/create', async (req, res, next) => {
    try {
        const { title, genre, plot, cast} = req.body;
        await Movie.create({
            title,
            genre,
            plot,
            cast //?pass all the celebrities from database
        });
        res.redirect('/movies'); //!ROUTE
    } catch (error) {
		next(error);
        res.render('movies/new-movie'); //!VIEW
	}
})

router.post('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Movie.findByIdAndDelete(id);

        res.redirect('/movies');
    }catch(error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        res.render('movies/movie-details', movie);
    } catch(error) {
		next(error);
	}
})

router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', { movies }); //!VIEW
    } catch(error) {
		next(error);
	}
})

module.exports = router;