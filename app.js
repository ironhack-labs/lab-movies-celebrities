require('dotenv/config');
require('./configs/db.config.js');
require('./error-handling');

const express = require('express');
const app = express();
const hbs = require('hbs');
const logger = require("morgan");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// Application middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "public"));

const routes = require('./configs/routes.config');
app.use('/', routes);

app.listen(3000, () => console.log(`Server listening on port http://localhost:3000`));
  
