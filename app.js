require('dotenv/config');
require('./db');


const express = require('express');
const hbs = require('hbs');
const app = express();


require('./config')(app);


const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

const indexRoutes = require('./routes/index');
const celebrityRoutes = require('./routes/celebrities.routes');
const movieRoutes = require('./routes/movies.routes');


/*const indexR = require('./routes/index');
const Celebrity = require('./routes/celebrities.routes');*/
app.use('/', indexRoutes);
app.use('/celebrities', celebrityRoutes);
app.use('/movies', movieRoutes);



require('./error-handling')(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
module.exports = app;
