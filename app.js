require('dotenv/config');

require('./db');



const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;


// SESSION MIDDLEWARE
// Checks incoming request: if there is a cookie, and if cookie has valid session id
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: 'PizzaBytes',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/lab-movies-celebrities'
    })
  })
);



//ROUTES

const celebrities = require('./routes/celebrities.routes');
app.use('/celebrities', celebrities);

const movies = require('./routes/movies.routes');
app.use('/movies', movies);

const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/authRouter');
app.use('/auth', auth);





require('./error-handling')(app);

module.exports = app;
