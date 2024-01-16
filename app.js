// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);
require('./config/session.config')(app);


// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

app.use((req, res, next)=>{
    app.locals.currentUser = req.session.currentUser;
    app.locals.errorMessage = req.flash("errorMessage");
    app.locals.successMessage = req.flash("successMessage");
    next();
});

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const celebrity = require('./routes/celebrities.routes');
app.use('/celebrities', celebrity);

const movie = require('./routes/movies.routes');
app.use('/movies', movie);

const user = require ('./routes/auth.routes');
app.use('/', user);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
