require('dotenv/config');

require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

const index = require('./routes/index');
app.use('/', index);

const celebritiesRoutes = require("./routes/celebrities.routes")
app.use("/celebrities", celebritiesRoutes)

require('./error-handling')(app);

module.exports = app;
