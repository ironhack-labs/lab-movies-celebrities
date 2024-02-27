const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

require('./configs/hbs.config');
require('./configs/db.config');

const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

const routes = require('./configs/routes.config');
app.use('/', routes);

const port = 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));