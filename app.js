
require('dotenv/config');

require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);
require("./config/session-config")(app)

const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const celebritiesRoutes = require('./routes/celebrities.routes')
app.use('/', celebritiesRoutes)

const moviesRoutes = require('./routes/movies.routes')
app.use('/', moviesRoutes)

const authRouters = require('./routes/auth.routes')
app.use('/', authRouters)

const userRouters = require('./routes/user.routes')
app.use('/', userRouters)

require('./error-handling')(app);

module.exports = app;
