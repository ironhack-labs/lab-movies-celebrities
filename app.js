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

const app = express();



// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

// app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;
app.locals.title = `Wiki Cinema`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const celebrities = require('./routes/celebrities.routes');
app.use('/celebridades', celebrities);

const newCelebrity = require('./routes/celebrities.routes');
app.use('/celebridades/registrar', newCelebrity);

const celebrityDetails = require('./routes/celebrities.routes');
app.use('/celebridades/detalles/:celebrity_id', celebrityDetails);

const editCelebrity = require('./routes/celebrities.routes');
app.use('/celebridades/:celebrity_id/editar', editCelebrity);

const deleteCelebrity = require('./routes/movies.routes');
app.use('/celebridades/borrar/:celebrity_id', deleteCelebrity);

//__________________________________________________
const movies = require('./routes/movies.routes');
app.use('/movies', movies);

const newMovie = require('./routes/movies.routes');
app.use('/movies/registrar', newMovie);

const movieDetails = require('./routes/movies.routes');
app.use('/movies/detalles/:movie_id', movieDetails);

const editMovie = require('./routes/movies.routes');
app.use('/movies/:movie_id/editar', editMovie);

const deleteMovie = require('./routes/movies.routes');
app.use('/movies/borrar/:movie_id', deleteMovie);




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
