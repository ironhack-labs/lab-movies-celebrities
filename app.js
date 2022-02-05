require('dotenv/config');

require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();


require('./config')(app);


const projectName = 'Movies and Celebrities';


app.locals.appTitle = projectName;


// Handling routes 

const index = require('./routes/index');
app.use('/', index);

const moviesRoutes = require('./routes/movies.routes')
app.use('/movies', moviesRoutes)

const celebritiesRoutes = require('./routes/celebrities.routes')
app.use('/celebrities', celebritiesRoutes)


// Handle errors

require('./error-handling')(app);

module.exports = app;
