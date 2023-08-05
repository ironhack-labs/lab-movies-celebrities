require('dotenv/config');

require('./db');

const express = require('express');

const app = express();


require('./config')(app);

app.locals.title = `Welcome to Movies and Celebrities`;

const index = require('./routes/index');
app.use('/', index);

const celebrities = require('./routes/celebrities.routes');
app.use('/celebrities', celebrities);

const movies = require('./routes/movies.routes');
app.use('/movies', movies);

require('./error-handling')(app);

module.exports = app;
