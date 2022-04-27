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

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const celebritiesRoutes = require("./routes/celebrities.routes")
app.use("/",celebritiesRoutes)

const moviesRoutes = require("./routes/movies.routes")
app.use("/", moviesRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

//helper handlebars
hbs.registerHelper('ifEqual', function (a, b, options) {
    if(a == b){
        return true//options.fn(this)
    } else {
        return false //options.inverse(this) 
    }
});

hbs.registerHelper('includes', function (arr, elem) {
    if(arr.indexOf(elem) != -1){
        return true
    } else{
        return false 
    }
});

module.exports = app;
