require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");

const app = express();

require("./config")(app);
const projectName = "lab-movies-celebrities";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);
app.use("/", require("./routes/index"));
app.use("/", require("./routes/celebrities.routes"));
app.use("/", require("./routes/movies.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
