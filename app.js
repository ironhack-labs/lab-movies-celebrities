
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')

require('./config/db.config');
require('./config/hbs.config')

const app = express();

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(express.urlencoded());

const router = require('./config/routes.config')
app.use('/', router);












const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

module.exports = app;
