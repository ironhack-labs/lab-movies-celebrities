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

const session = require("express-session");//crear session
const MongoStore = require("connect-mongo");//guardar session

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here

app.use(//siempre arriba de todas las rutas
    session({
      secret: 'PizzaBytes',//string que sirve de firma para la session
      resave: true,
      saveUninitialized: true,
      cookie: {//vida maxima de la cookie
        maxAge: 30 * 24 * 60 * 60 * 1000
      },
      store: MongoStore.create({//lugar donde se guardan las sesiones en nuestra DB
        mongoUrl: 'mongodb://localhost/auth-demo'
      })
    })
);

const siteRouter = require("./routes/site-router");
app.use('/site', siteRouter)

const indexRouter = require("./routes/index-router");
const isLoggedIn = require('./middleware/isLoggedIn')
app.use("/", isLoggedIn, indexRouter)

const authRouter = require("./routes/auth-router");
app.use("/auth", authRouter);

const celebritiesRouter = require('./routes/celebrities.routes')
app.use('/celebrities', celebritiesRouter)

const moviesRouter = require('./routes/movies.routes')
app.use('/movies', moviesRouter)

const index = require('./routes/index-router');
app.use('/', index);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

