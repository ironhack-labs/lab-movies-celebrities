const mongoose = require('mongoose');
const Celebrities = require('../models/Celebrity.model');
const Movies = require('../models/Movie.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities';


const celebrities = [
  {
      name: "Danny Glover",
      occupation: "actor",
      catchPhrase: "I'm getting too old for this shit",
  },
  {
      name: "Arnold Schwarzenegger",
      occupation: "actor",
      catchPhrase: "I'll be back",
  },
  {
      name: "Matt LeBlanc",
      occupation: "actor",
      catchPhrase: "How you doin",
  },
  {
      name: "Mel Gibson",
      occupation: "actor",
      catchPhrase: "Pain is the precursor to change",
  },
  {
      name: "Linda Hamilton",
      occupation: "actress",
      catchPhrase: "My heart is so light that it's amazing. I get to play all this grief, all this loss, all this disaster and chaos.",
  }

];

const movies = [
  {
    title: 'Terminator',
    genre: 'Action',
    plot: 'A guy from the future trying to kill the future of human kind',
  },
  {
    title: 'Lethal Weapon',
    genre: 'Action',
    plot: 'Two guys against villains',
  },
  {
    title: 'Lost in Space',
    genre: 'Action',
    plot: 'I have no idea',
  }


];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    const moviesPromise = Movies.create(movies);
    const celebritiesPromise = Celebrities.create(celebrities);

    return Promise.all([moviesPromise, celebritiesPromise])
  })
  .then( result => {
    
    const moviesCreated = result[0];
    const celebritiesCreated = result[1];
    console.log(`Number of movies created... ${moviesCreated.length} `);
    console.log(`Number of celebrities created... ${celebritiesCreated.length} `);


    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(`An error occurred while creating books from the DB: ${err}`)
  });
