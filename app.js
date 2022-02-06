require('dotenv/config')
require('./db')
const express = require('express')
const hbs = require('hbs')

const app = express()

require('./config')(app)

app.locals.appTitle = `Celebrities n movies`

// index route
const index = require('./routes/index')
app.use('/', index)

// celebrities route
const celebritiesRoutes = require('./routes/celebrities.routes')
app.use('/celebrities', celebritiesRoutes)

// movies route
const moviesRoutes = require('./routes/movies.routes')
app.use('/movies', moviesRoutes)

require('./error-handling')(app)

module.exports = app;
