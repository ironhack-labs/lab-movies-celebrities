require("dotenv").config();
require('../config/db.config');
const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.models");
const celebrities = require("../data/celebrities.json");
const movies = require ("../data/movies.json");



mongoose.connection.once('open', () => {
    console.info(`*****Connected to the database**********`)
    console.info("Running seeds scripts");
    console.info("Dropping database");
    mongoose.connection.db.dropDatabase()//*1
        .then(() =>  Movie.create(movies) )//creating movie 
        .then((movies) => {//*2
            console.info (`Successfully created ${movies.length} movies`)
            movies.forEach((movie) => console.info(`\t- ${movie.title}`))//*3

        })
        .then(() => console.info("**All data created"))
        .catch((error) => console.error("An errror ocurred running seeds scripts", error));
})










//*1 Borramos toda la base de datos y nos devuelve una promesa 
//*2 este es el then de el Movie.created
//*3 solo para que se vea en la consola no hace falta para nada mas 
