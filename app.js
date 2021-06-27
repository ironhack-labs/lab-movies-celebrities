require('dotenv/config');
require('./db');

const express = require('express');
const hbs = require('hbs');
const app = express();

require('./config')(app);

const projectName = 'WikiPlayer - Football app Database'

app.locals.title = projectName

const index = require('./routes/index');
app.use('/', index);

const playersPage = require('./routes/players.routes')
app.use('/players', playersPage);

const teamsPage = require('./routes/teams.routes')
app.use('/teams', teamsPage);

require('./error-handling')(app);

module.exports = app;
