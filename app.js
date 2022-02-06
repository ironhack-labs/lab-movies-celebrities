require('dotenv/config');

require('./db');

const express = require('express');
const hbs = require('hbs');
const app = express();

require('./config')(app);

app.locals.apptitle = 'Movies and celebrities';

const index = require('./routes/index.routes');
app.use('/', index);


const celebritiesRoutes = require('./routes/celebrities.routes')
app.use('/', celebritiesRoutes)

const moviesRoutes = require('./routes/movies.routes')
app.use('/', moviesRoutes)


require('./error-handling')(app);


module.exports = app;
