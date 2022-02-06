const mongoose = require('mongoose');
const Movie = require('../models/Movie.model');


const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

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

const movies = [
    {
        title: "The Dark Knight",
        genre: "Drama",
        plot: "A gang of criminals rob a Gotham City mob bank",
        cast: { _id }
    },

    {
        title: "Legend",
        genre: "Drama",
        plot: "In the 1960s, Reggie Kray is a former boxer who has become an important part of the criminal underground in London.",
        cast: { _id }
    },

    {
        title: "The big short",
        genre: "comedy",
        plot: "The Big Short, based on a non-fiction book by Michael Lewis, chronicles the real lives and actions of several financial-industry professionals in the mid-2000s",
        cast: { _id }
    },

    {
        title: "Mamma mia!",
        genre: "Musical comedy",
        plot: " a young bride-to-be who invites three men to her upcoming wedding, each one with the possibility of being her father.",
        cast: { _id }

    },

    {
        title: "Silver Linings Playbook",
        genre: "Comedy and Drama",
        plot: "In their fragile mental states, Pat Jr. and Tiffany embark on a love/hate friendship based primarily on what help the other can provide in achieving their individual goals.",
        cast: { _id }

    },

];

Movie.create(movies)
    .then(moviesFromDB => {
        console.log(`Created ${moviesFromDB.length} movies`);
        mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));