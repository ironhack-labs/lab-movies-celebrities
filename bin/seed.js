// bin/seeds.js
 
const mongoose = require('mongoose');
const  Celebrity = require('../models/Celebrity.model.js'); 
 
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities';
 
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
 
// PASTE HERE THE LIST OF BOOKS PROVIDED IN THIS GIST: https://gist.github.com/ironhack-edu/2816267a015d4870f95275cb873d33b6
 
const celibrities = [  {
    name: "Emma Watson",
    occupation: "Actress",
    catchPhrase: "Abc..."
  }];
 
Celebrity.create(celibrities)
  .then(celibritiesFromDB => {
    console.log(`Created ${celibritiesFromDB.length} books`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));