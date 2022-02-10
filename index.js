// importaciones
const express = require('express');
const app = express();
const hbs = require('hbs');
const connectDB = require('./config/db');
const sessionManager = require('./config/session');


//middlewares

require('dotenv').config();
sessionManager(app);
connectDB();
app.use(express.static('public'))
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

//ruteos
app.use((req, res, next) => {
    console.log(req.session.currentUser)
    res.locals.currentUser = req.session.currentUser //guarda en local 
    console.log(res.locals);
    next()
})
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/movies', require('./routes/movies'))
app.use('/celebrities', require('./routes/celebrities'))

//servidor
app.listen(process.env.PORT, () => console.log(`Servidor activo en puerto ${process.env.PORT}`))