// Gets access to environment variables/settings
require('dotenv/config');

// Connects to the database
require('./db');

// Handles http requests (express is node js framework)
const express = require('express');

// Handles the handlebars
const hbs = require('hbs');

const app = express();

// This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const celebrities = require('./routes/celebrities.routes');
app.use('/', celebrities);

const movies = require('./routes/movies.routes');
app.use('/', movies);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
