const mongoose = require("mongoose");
const { Schema, model } = mongoose;

require("../configs/db.config");

// const Celebrity = require("../models/celebrity.model");

// const celebrities = [
//     { name: "DJ Khaled", 
//     occupation: "record producer",
//     catchPhrase: "Another One",
//     },
//     { name: "Ariana Grande", 
//     occupation: "singer",
//     catchPhrase: "Say It With Emojis",
//     },
//     { name: "Walter Cronkite", 
//     occupation: "broadcaster",
//     catchPhrase: "And That's The Way It Is",
//     }
// ];

// // node bin/seeds.js

// Celebrity.create(celebrities)
//     .then((celebritiesFromDB) => {
//     console.log(`Successfully created ${celebritiesFromDB.length} celebrities.`);

//     mongoose.connection.close();
// })
// .catch((err) => console.log(`Something went wrong with seeding the database: ${err}`));


const Movie = require("../models/movie.model");

const movies = [
    { title: "Where at", 
    genre: "comedy",
    plot: "family reunion",
    cast: [],
    },
    { title: "Tonight", 
    genre: "drama",
    plot: "Missing person",
    cast: [],
    },
    { title: "Forever", 
    genre: "romance",
    plot: "family hatred",
    cast: [],
    }
];

// // node bin/seeds.js

Movie.create(movies)
    .then((moviesFromDB) => {
    console.log(`Successfully created ${moviesFromDB.length} movies.`);

    mongoose.connection.close();
    })
    .catch((err) => console.log(`Something went wrong with seeding the database: ${err}`));