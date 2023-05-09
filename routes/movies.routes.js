const router = require("express").Router();

const Movie = require('../models/Movie.model');

router.post('/movies/create', async(req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    try {
        const newMovie = await Movie.create({ title, genre, plot, cast });
        res.status(200).json(newMovie);
    } catch (error) {
        next(error);        
    }
});

router.get('/movies', async (req, res, next) => {
    try {
        const allMovies = await Movie.find();
        res.status(200).json(allMovies);
    } catch (error) {
        next(error);
    }
});

router.get('/movies/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id, {}).populate();
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

router.post('/movies/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Movie.findByIdAndDelete (id);
        res.status(204).json;
    } catch (error) {
        next(error);        
    }
});

router.get('/movies/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

router.post('/movies/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(movie)
    } catch (error) {
        next(error);
    }
})

module.exports = router;