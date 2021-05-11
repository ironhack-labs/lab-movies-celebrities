require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const hbs = require("hbs");

const app = express();

// require database configuration
require("./configs/db.config");

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
// hbs.registerPartials(__dirname, '/views/celebrities')
// hbs.registerPartials(__dirname, '/views/movies')

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      V  V  V
app.use("/", require("./routes/index.routes"));
app.use("/celebrities", require("./routes/celebrities.routes"));
app.use('/movies', require('./routes/movies.routes'))

module.exports = app;
