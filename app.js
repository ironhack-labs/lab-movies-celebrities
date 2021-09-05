require('dotenv/config');
require('./db');

const express = require('express');
const hbs = require('hbs');
const app = express();

require('./config')(app);

const projectName = 'IronMovies';
app.locals.siteTitle = projectName;

const index = require('./routes/index');
app.use('/', index);

const celebrities = require('./routes/celebrities.routes')
app.use('/celebrities', celebrities);

const movies = require('./routes/movies.routes')
app.use('/movies', movies);

require('./error-handling')(app);

module.exports = app;
