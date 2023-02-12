require('dotenv/config');
require('./db');

const express = require('express');
const hbs = require('hbs');
const app = express();

require('./config')(app);

app.locals.title = 'Movies & Celebs'

const index = require('./routes/index');
app.use('/', index);

const Celebrities = require('./routes/celebrities.routes')
app.use('/', Celebrities)

const Movies = require('./routes/movies.routes')
app.use('/', Movies)

require('./error-handling')(app);

module.exports = app;
