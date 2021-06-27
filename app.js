require('dotenv/config');
require('./db');

const express = require('express');
const hbs = require('hbs');
const app = express();


require('./config')(app);

const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

const index = require('./routes/index');
app.use('/', index);


app.use('/celebrities', require('./routes/celebrities.routes'));
app.use('/movies', require('./routes/movies.routes'));


require('./error-handling')(app);

module.exports = app;
// lineas 20 y 21 uso la app para requerir las rutas creadas de celebrities como movies.