require('dotenv/config')
require('./db')

const express = require('express')
const hbs = require('hbs')
const app = express()

require('./config')(app)

const projectName = 'celebrities project'
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase()

app.locals.title = `${capitalized(projectName)}`

const index = require('./routes/index')
const movies = require('./routes/movies.routes')
const celebrities = require('./routes/celebrities.routes')
app.use('/', index, movies, celebrities)


require('./error-handling')(app)

module.exports = app
