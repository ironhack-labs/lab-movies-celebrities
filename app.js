// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');
const express = require('express');
const hbs = require('hbs');
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

app.locals.appTitle = `Cinescape_`;

// 👇 index routes
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

// celebrities routes
const celebritiesRoutes = require('./routes/celebrities.routes');
app.use('/celebrities', celebritiesRoutes);

// movies routes
const moviesRoutes = require('./routes/movies.routes');
app.use('/movies', moviesRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
