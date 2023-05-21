require('dotenv/config')
require('./db')

const express = require('express')

const hbs = require('hbs')
require('./handlebars-helpers/handlebars-helpers')

const app = express()

require('./config')(app)

app.locals.title = 'lab-movies-celebrities'

require('./routes/index')(app)

require('./error-handling')(app)

module.exports = app
