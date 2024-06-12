require('dotenv/config');
require('./db');
const express = require('express');
const hbs = require('hbs');

const app = express();

require('./config')(app);
app.locals.title = `Movies and Celebrities`;

// 👇 Start handling routes here
const index = require('./routes/index');
const movies = require('./routes/movies.routes')
const stars = require('./routes/celebrities.routes')

app.use('/', index)
app.use('/movies', movies)
app.use('/celebrities', stars)


require('./error-handling')(app);

module.exports = app;
