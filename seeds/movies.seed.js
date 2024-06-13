const Movie = require('./../models/Movie.model');
const mongoose = require("mongoose");

const movies = [
    {
        title: 'The Dark Knight',
        genre: 'Action',
        plot: 'A vigilante superhero battles the criminal underworld of Gotham City.',
        cast: []
    },
    {
        title: 'Inception',
        genre: 'Science Fiction',
        plot: 'A thief enters the subconscious minds of his targets to steal their secrets.',
        cast: []
    },
    {
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        plot: 'Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.',
        cast: []
    }
];

const connectionString = 'mongodb://127.0.0.1:27017/lab-movies';

mongoose
    .connect(connectionString)
    .then(() => {
        console.log(`Connected to Mongo database: "${mongoose.connection.name}"`);
        return Movie.create(movies);
    })
    .then(moviesFromDB => {
        console.log(`Created ${moviesFromDB.length} movies`);
        return mongoose.connection.close();
    })
    .then(() => {
        console.log('DB connection closed!');
    })
    .catch(err => {
        console.log(`An error occurred while creating models from the DB: ${err}`);
    });
