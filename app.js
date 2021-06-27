// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config')

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app, hbs)

// default value for title local
app.locals.title = `Movies & celebrities`

// 👇 Start handling routes here
const index = require('./routes/')
const celebs = require('./routes/celebs/')
const movies = require('./routes/movies/')
app.use('/', index, celebs, movies)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
