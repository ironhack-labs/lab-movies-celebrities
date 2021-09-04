require('dotenv/config')

require('./db')

const express = require('express')

const hbs = require('hbs')

const app = express()

require('./config')(app)

const projectName = 'Movies and celebrities';

app.locals.titleSite = `${projectName} - Generated with Ironlauncher`

const index = require('./routes/index');

const celebritiesRoutes = require('./routes/celebrities.routes')
const moviesRoutes = require('./routes/movies.routes')

app.use('/', index);
app.use('/', celebritiesRoutes)
app.use('/', moviesRoutes)

require('./error-handling')(app);

module.exports = app;
