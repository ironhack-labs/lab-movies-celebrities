// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

const express = require('express');

require("./db");
const hbs = require('hbs');

const app = express();


require('./config')(app);


const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `Celebrities`;

const index = require('./routes/index');
app.use('/', index);

const celebrities = require('./routes/celebrities.routes');
app.use('/', celebrities);

const movie = require('./routes/movies.routes');
app.use('/', movie);

require('./error-handling')(app);


module.exports = app;




