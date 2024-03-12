// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

hbs.registerHelper('celebrityInCast', function(movie, celebrities, options) {
    const arrayIds = movie.map(film => film._id.toString());
    const isSelected = arrayIds.includes(celebrities._id.toString());
    return isSelected ? options.fn(this) : options.inverse(this);
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/routes');
app.use('/', index);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});

module.exports = app;
