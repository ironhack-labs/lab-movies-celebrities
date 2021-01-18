const mongoose = require("mongoose");

require("../configs/db.config");

// const Celebrity = require("../models/celebrity.model");

// const celebrities = [
//     { title: "DJ Khaled", 
//     genre: "record producer",
//     plot: "Another One",
//     },
//     { title: "Ariana Grande", 
//     genre: "singer",
//     plot: "Say It With Emojis",
//     },
//     { title: "Walter Cronkite", 
//     genre: "broadcaster",
//     plot: "And That's The Way It Is",
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
    },
    { title: "Tonight", 
    genre: "drama",
    plot: "Missing person",
    },
    { title: "Forever", 
    genre: "romance",
    plot: "family hatred",
    }
];

// node bin/seeds.js

Movie.create(movies)
    .then((moviesFromDB) => {
    console.log(`Successfully created ${moviesFromDB.length} movies.`);

    mongoose.connection.close();
    })
    .catch((err) => console.log(`Something went wrong with seeding the database: ${err}`));