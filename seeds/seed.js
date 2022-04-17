const mongoose = require('mongoose');
const Drone = require('../models/Star.model');
const Movie = require('../models/Movie.model')

const MONGO_URI = 'mongodb://localhost/stars-movies-app'           // <- OJO, el mismo nombre que vayas a poner en el .env

mongoose
    .connect(MONGO_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo: ", err))
