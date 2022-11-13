require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

// Create a new function for checking duplicates
// and displaying as selected the celebrities of the edited movie
hbs.registerHelper("checkDuplicates", function (movieCast, celebsCasted) {
	let selected = [];
	movieCast.forEach((celebsCasted) => selected.push(celebsCasted.name));
	if (selected.includes(celebsCasted)) {
		return true;
	}
});

const app = express();

require("./config")(app);

const projectName = "lab-movies-celebrities";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

const index = require("./routes/index");
app.use("/", index);

require("./error-handling")(app);

module.exports = app;
