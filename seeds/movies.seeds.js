const Movies = require('../models/Movies.model')
const mongoose = require("mongoose");


const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });

const moviess = [
    { title: 'Love Paris', genre: 'Drama', plot: 'love' }
]

Movies
    .create(moviess)
    .then(eachMovie => {
        console.log(`Created ${eachMovie.length} movies`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))