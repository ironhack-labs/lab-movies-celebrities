
require('dotenv/config');


require('./db');


const express = require('express');


const hbs = require('hbs');

const app = express();

require('./config')(app);


const projectName = 'lab-movies-celebrities';


// app.locals.title = `Tus pelis y actores favoritos`;

const moviesRoutes = require('./routes/movies.routes')
app.use('/', moviesRoutes)

const celebritiesRoutes = require('./routes/celebrities.routes')
app.use('/', celebritiesRoutes)

const index = require('./routes/index');
app.use('/', index);


require('./error-handling')(app);

module.exports = app;
