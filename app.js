require('dotenv/config')

require('./db')

const express = require('express')

const hbs = require('hbs')

const app = express()

require('./config')(app)





const index = require('./routes/index')
app.use('/', index)

const celebritiesRouts = require("./routes/celebrities")
app.use("/celebrities", celebritiesRouts)


const moviesRouts = require("./routes/movies")
app.use("/movies", moviesRouts)

require('./error-handling')(app)

module.exports = app
