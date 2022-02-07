require('dotenv/config');

require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

app.locals.appTitle = `Celebrities and Movies`;

const index = require('./routes/index');
app.use('/', index);

app.use('/', require('./routes/celebrities.routes'))

app.use('/', require('./routes/movies.routes'))

require('./error-handling')(app);

module.exports = app;
