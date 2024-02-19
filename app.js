require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const logger = require("morgan");

require("./db/celebrities.db"); // es como si pusieramos todas las lineas del db.confgi aquí, pero somos mejores que eso.

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

const routes = require("./routes/main");
app.use("/", routes);

module.exports = app;
