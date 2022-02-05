
require('dotenv/config');


require('./db');


const express = require('express');


const hbs = require('hbs');

const app = express();


require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);


//movies route
const movies = require('./routes/movies.routes')
app.use('/', movies)


//celebrities route
const celebrities = require('./routes/celebrities.routes')
app.use('/', celebrities)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
