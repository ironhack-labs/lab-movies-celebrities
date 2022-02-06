require('dotenv/config');

require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

app.locals.appTitle = `Cinema Celebrities`;

const index = require('./routes/index');
app.use('/', index);

const celebritiesRoutes = require('./routes/celebrities.routes')
app.use('/celebridades', celebritiesRoutes)

require('./error-handling')(app);

module.exports = app;
