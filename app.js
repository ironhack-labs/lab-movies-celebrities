require('dotenv').config();
const express = require('express');

require('./configs/hbs.config');
require('./configs/db.config');

const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.urlencoded());

const router = require('./configs/routes.config');
app.use('/', router);

const port = 3000;
app.listen(port, () => console.info(` listen ${port}!! 😎`));