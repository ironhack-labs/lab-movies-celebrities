const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err);
  });


  const seedCelebs = [

    {
        name: 'Shakira',
        occupation : 'singer',
        catchPhrase : 'My hips dont lie'
    },
    
    {
        name: 'Kim Kardashian',
        occupation : 'who knows',
        catchPhrase : 'who cares'
    },

]

  Celebrity.create(seedCelebs)
  .then((seedCelebs) => {
    console.log(`Created ${seedCelebs.length} in the Database`);

    mongoose.disconnect();
  })
  .catch((err) => console.log(err));