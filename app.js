require('dotenv/config');
require('./db');
const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;// 👇 Start handling routes here

const index = require('./routes/index');
app.use('/', index);

const celebrities = require('./routes/celebrities.routes.js');
app.use('/', celebrities);

// const celebrities = require('./routes/movies.routes.js');
// app.use('/celebrities', celebrities);

const movies = require('./routes/movies.routes.js');
app.use('/', movies);

// const index = require('./routes/index');
// app.use('/', index);

// const index = require('./routes/index');
// app.use('/', index);


require('./error-handling')(app);

module.exports = app;
