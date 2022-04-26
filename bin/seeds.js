const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/new-app';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });






    // Once created, close the DB connection
    mongoose.connection.close();
  
    .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));

