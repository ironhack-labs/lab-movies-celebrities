const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities';

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



const celebrities = [
  {
    name: "carey mulligan",
    occupation: "actress",
    catchPhrase: "I don't think you should ever damage other people for your art."
  },
  {
    name: "jennifer lawrence",
    occupation: "actress",
    catchPhrase: "If I don't have anything to do all day, I might not even put my pants on."
  },
  {
    name: "johnny depp",
    occupation: "actor",
    catchPhrase: "My body is my journal, and my tattoos are my story."
  },
  {
    name: "jimmy fallon",
    occupation: "entertainer",
    catchPhrase: "Everyone looks so much better when they smile."
  }
]






Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);
    // return Movie.create(movies);
  })
  .then(moviesFromDB => {
    console.log(`Created ${moviesFromDB.length} books`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred seeding data in DB: ${err}`));

