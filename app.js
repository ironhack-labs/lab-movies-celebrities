require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");

const app = express();
require("./config")(app);

app.locals.title = `Movies and Celebrities`;

const celebritiesRoutes = require("./routes/celebrities.routes")
app.use("/", celebritiesRoutes)

const moviesRoutes = require("./routes/movies.routes")
app.use("/", moviesRoutes)

const index = require("./routes/index");
app.use("/", index);

require("./error-handling")(app);

module.exports = app;
