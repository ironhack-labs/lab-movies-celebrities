require('../db');
const movies = require('../data/movies');
const celebmoviesrities = require('../data/movies');
const Movie = require('../models/Movie.model');

const movieseed = async ()=>{
    try {
        await Movie.deleteMany();
        await Movie.create(movies);
    } catch (error) {
        console.log(error);
    }
}

movieseed();