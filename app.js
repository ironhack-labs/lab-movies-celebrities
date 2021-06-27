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
const projectName = "Luca's Film Create Movies & Celebrities";

app.locals.project_title = `${projectName}🚀`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);
const celebritiesCreate = require('./routes/celebrities-routes');
app.use('/', celebritiesCreate);
const moviesCreate = require('./routes/movies-routes');
app.use('/', moviesCreate);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
