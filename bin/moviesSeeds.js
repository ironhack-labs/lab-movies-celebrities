const mongoose = require('mongoose');
const Movie = require('../models/Movie.model');
const { movies } = require('../public/js/movies.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('movies')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Movie.create(movies);
    })
    .then((moviesDB) => {
      moviesDB.forEach(movie => console.log(`${movie.title} has been created`));
    })
    .catch(err => console.error(err))
    .finally(() => {
      mongoose.connection.close()
      .then(() => {
        console.log('End of seeds');
      })
      .catch((err) => console.error('Error while disconnecting', err))
      .finally(() => process.exit(0))
    })
})