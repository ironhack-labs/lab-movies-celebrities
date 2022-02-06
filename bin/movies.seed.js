const mongoose = require('mongoose');
const Movie = require('../models/Movie.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities';

mongoose
        .connect(MONGO_URI)
        .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
        .catch((err) => console.error("Error connecting to mongo: ", err))

const movies = [
    { 
        title: 'Mission Imposbile', 
        genre: 'Action', 
        plot: 'Spies fighting evil'
    },{ 
        title: 'Avengers', 
        genre: 'Science Fiction', 
        plot: 'Superheroes saving the world'
    },{ 
        title: 'Gosembumps', 
        genre: 'Rap', 
        plot: 'Sing about the life and the gosembumps'
    },{ 
        title: 'The Dark Knight', 
        genre: 'Drama', 
        plot: 'Superheroe saving Gotham City'
    },{ 
        title: 'Big Bang Theory', 
        genre: 'Comedy', 
        plot: 'Geek Scientists'
    },{ 
        title: 'Tesla',
        genre: 'Cars', 
        plot: 'Cars using techonology and AI'
    }
];

Movie.create(movies)
     .then(moviesDB => {
        console.log(`Created ${moviesDB.length} movies`)
        mongoose.connection.close()
     })
     .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`))


// const createCelebrities = movies.map(movie => {
//     const newCelebrity = new Celebrity(movie.cast)
//     return newCelebrity.save()
//         .then(celebrity => {
//             return celebrity.name;
//         })
//         .catch(error => {
//             throw new Error(`Impossible to add the celebrity. ${error}`)
//         })
// })


// let findCelebrities = Promise.all(createCelebrities)
//     .then(celebrities => {
//         return movies.map(movie => {
//             return Celebrity.findOne({ name: movie.cast.name })
//                 .then(celebrity => {
//                     if (!celebrity) {
//                         throw new Error(`unknown celebrity ${movie.cast.name}`);
//                     }
//                     return Object.assign({}, movie, { celebrity: celebrity._id });
//                 })
//         });
//     })
//     .catch(error => {
//         throw new Error(error)
//     })

// const saveMovies = findCelebrities.then(findCelebrities => {
//     return Promise.all(findCelebrities)
//         .then(movies => {
//             return movies.map(movie => {
//                 const newMovie = new Movie(movie);
//                 return newMovie.save();
//             })
//         })
// }).then(savedMovies => {
//     Promise.all(savedMovies)
//         .then(movies => movies.forEach(movie => console.log(`created ${movie.cast}`)))
//         .then(() => mongoose.connection.close())
//         .catch(err => console.log("Error while saving the movie: ", err))
// })