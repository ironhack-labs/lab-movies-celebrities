require('dotenv/config')

require('./db')

const express = require('express')

const hbs = require('hbs')

const app = express()

require('./config')(app)


app.locals.title = `Cineteca`

const index = require('./routes/index')


const celebritiessRoutes = require("./routes/celebrities.routes")
app.use("/celebrities", celebritiessRoutes)

const moviesRoutes = require("./routes/movies.routes")
app.use("/movies", moviesRoutes)


const Celebrity = require('./models/Celebrity.model')
const Movie = require('./models/Movie.model')

app.use('/', index)

require('./error-handling')(app)

module.exports = app
