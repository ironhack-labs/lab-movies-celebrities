
require('dotenv/config');

require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;



const index = require('./routes/index'); // APP.JS TIENE QUE REQUERIR TODAS LAS RUTAS

app.use('/', index);

// app.use("direccion html", require("ruta a carpeta de la ruta"))
app.use('/celebrities', require('./routes/celebrities.routes')) //RUTA DE CELEBRIDADES

app.use('/movies', require('./routes/movies.routes'))// RUTA DE PELICULAS

require('./error-handling')(app);

module.exports = app;
