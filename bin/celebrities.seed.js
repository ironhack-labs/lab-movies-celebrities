const mongoose = require("mongoose");
require('../config/db.config');
const celebrity = require('../models/Celebrity.model');

/*mongoose.connection.once('open', () => {
  Movie.collection.drop()
    .then(() => {
      return celebrity.create(movies);
    })
    .then((moviesCreated) => {
      console.log(moviesCreated.length + " movies created");
      mongoose.connection.close();
      process.exit(0);
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
});*/