require("dotenv").config();

// Require Express/morgan and hbs
const express = require("express");
const logger = require("morgan");
const hbs = require("hbs");

//require database
require("./config/db.config");

// Express server handling requests and responses
const app = express();

// Make everything inside of public/ available
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

// creates an absolute path pointing to a folder called "views"
app.set("views", __dirname + "/views");
// tell our Express app that HBS will be in charge of rendering the HTML
app.set("view engine", "hbs");

// register the partials
hbs.registerPartials(__dirname + "/views/partials");

// Routes
const routes = require("./config/routes.config.js");
app.use(routes);

app.use((err, req, res, next) => {
  res.render("error", { err });
});

// Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
