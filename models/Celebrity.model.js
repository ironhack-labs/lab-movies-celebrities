const { Celebrity, model } = require('mongoose');
 
const userCelebrity = new Celebrity(
  {
    name: String,
    occupation: String,
    catchPhrase: String
  },
);
 
const Celebrity = model('User', userCelebrity);
 
module.exports = Celebrity;


const { Movie, model } = require('mongoose');
 
const userMovie = new Movie(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Celebrity.Types.ObjectId, ref: 'Post' }]
  }
);
 
const Movie = model('User', userMovie);
 
module.exports = Movie;