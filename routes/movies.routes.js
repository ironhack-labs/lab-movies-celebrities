const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here

router.get('/create', async (req, res, next) => { //!ROUTE
    try {
    const celebrities = await Celebrity.find(); //*pass all the celebrities from database
    res.render('movies/new-movie', { celebrities }); //!VIEW  
    }catch(error) {
        next(error);
    }
})

router.post('/create', async (req, res, next) => {
    try {
        const { title, genre, plot, cast} = req.body;
        await Movie.create({
            title,
            genre,
            plot,
            cast 
        });
        res.redirect('/'); //!ROUTE
    } catch (error) {
		next(error);
        res.render('movies/new-movie'); //!VIEW
	}
})

router.get('/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id)
        .populate('cast');
        res.render('movies/edit-movie', movie);
    }catch(error) {
        next(error);
    }
})

router.post('/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, genre, plot, cast} = req.body;
        await Movie.findByIdAndUpdate(id, 
            {
            title,
            genre,
            plot,
            cast
            },
            {
            new: true
            }); 
            res.redirect('/movies');
    }catch(error) {
        next(error);
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
        const movie = await Movie.findById(id)
        .populate('cast');
        console.log(cast);
        res.render('movies/movie-details', { movie });
    } catch(error) {
		next(error);
	}
})

router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find()
        .populate('cast');
        res.render('movies/movies', { movies }); //!VIEW
    } catch(error) {
		next(error);
	}
})

module.exports = router;