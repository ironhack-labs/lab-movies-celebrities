require('dotenv/config');

require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

const projectName = 'Movies Celebrities'

app.locals.title = `${projectName}`

const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes);

const celebritiesRoutes = require('./routes/celebrities.routes')
app.use('/celebrities', celebritiesRoutes)

const moviesRoutes = require('./routes/movies.routes')
app.use('/movies', moviesRoutes)

require('./error-handling')(app);

module.exports = app;
