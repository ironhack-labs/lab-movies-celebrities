require("dotenv").config();

const mongoose = require('mongoose')
const express = require("express");
const hbs = require("hbs");
const logger = require("morgan");
const app = express();

require("./config/db.config");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

const routes = require("./routes/main");
app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running at port ${port}`));
