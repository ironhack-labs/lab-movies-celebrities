require('dotenv/config');

require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

const index = require('./routes/index');
app.use('/', index);

const celebritiesRoutes = require('./routes/celebrities.routes')
app.use('/celebrities', celebritiesRoutes)

const moviesRoutes = require('./routes/movies.routes')
app.use('/movies', moviesRoutes)


require('./error-handling')(app);

module.exports = app;
