require('dotenv/config');

require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

const projectName = 'lab-movies-celebrities';

app.locals.appTitle = `${projectName}- Generated with Ironlauncher`;


const index = require('./routes/index');
app.use('/', index);

//celebs routes
const celebritiesRoutes = require("./routes/celebrities.routes")
app.use("/celebrities", celebritiesRoutes)

//movies routes
const moviesRoutes = require("./routes/movies.routes")
app.use("/movies", moviesRoutes)


require('./error-handling')(app);

module.exports = app;
