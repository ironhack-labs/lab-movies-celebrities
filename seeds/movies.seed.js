const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/lab-mongoose-movies';

const movies = [
    { title: 'The Terminator', genre: 'Action', plot: 'A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her teenage son, John Connor, from a more advanced cyborg, made out of liquid metal.', cast: ["63b34229fe857b79cabfc9be"] },
    { title: 'Rambo', genre: 'Action', plot: 'A former Green Beret is forced by a cruel Sheriff and his deputies to flee into the mountains and wage an escalating campaign of guerrilla warfare against the law enforcement officers.', cast: ["63b34229fe857b79cabfc9bf"] },
    { title: 'Die Hard', genre: 'Action', plot: 'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.', cast: ["63b34229fe857b79cabfc9c0"] },

];




mongoose.connect(MONGO_URI).then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    Movie.create(movies)
        .then((movies) => {
            console.log(movies.length + ' movies added to database');
            mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
})
    .catch((err) => {
        console.error('Error connecting to database', err);
    }
    );


