
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
const movies = require('./routes/movies.routes');
app.use('/', movies);
const celebrities = require('./routes/celebrities.routes');
app.use('/', celebrities);



require('./error-handling')(app);

module.exports = app;
