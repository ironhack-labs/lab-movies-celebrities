const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model')

router.get('/', async (req, res, next) => {
    try {
        const moviesFromDB = await Movie.find();
        res.status(200).json(moviesFromDB);
    } catch (error) {
        next(error);
    }
});

router.post('/create', async (req, res, next) => {
    const {title, genre, plot, cast} = req.body;

    try {
        const celebritiesIds = []

        for (let i = 0; i < cast.length; i++) {
            const celebrityFromDB = await Celebrity.findOne({name: cast[i]})
            celebrityFromDB && celebritiesIds.push(celebrityFromDB._id) 
        }

        const movieFromDB = await Movie.create({title, genre, plot, cast: celebritiesIds}); 
        res.status(201).json(movieFromDB)
    } catch (error) {
        next(error);
    }
}); 


module.exports = router;