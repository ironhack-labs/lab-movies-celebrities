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


const celebrities = [{
        name: "Beyonce",
        occupation: "singer",
        catchPhrase: "Who run the world?",
    },
    {
        name: "Tim Burton",
        occupation: "film director",
        catchPhrase: "One person's craziness is another person's reality.",
    },
    {
        name: "Lin Manuel Miranda",
        occupation: "actor, singer-songwriter, playwright, and filmmaker",
        catchPhrase: "You are perfectly cast in your life. I can't imagine anyone but you in the role. Go play",
    },
];

const movies = [{
        title: "Once Upon a Vibe",
        genre: "dramatic comedy",
        plot: "Lin Manuel Miranda must work together with Tim Burton to write an epic new musical starring Beyonce",
        cast: ["626824a5f6880df0a998cc89", "626824a5f6880df0a998cc8a", "626824a5f6880df0a998cc8b"],
    },
   
];


Celebrity.create(celebrities)
    .then((celebritiesFromDB) => {
        console.log(`Created ${celebritiesFromDB.length} celebs`);
    })
    .catch(err => console.log(`An error occurred while creating celebs from the DB: ${err}`));

Movie.create(movies)
    .then((moviesFromDB) => {
        console.log(`Created ${moviesFromDB.length} movies`);
    })
    .catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));
