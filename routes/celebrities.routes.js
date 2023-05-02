// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//routes here
const Celebrity = require('../models/Celebrity.model');


//Mostrar un formulario para crear una Celebrity    
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

//Crear una Celebrity
router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err));
});

//render for new-celebrity
router.get('/celebrities/new-celebrity', (req, res) => {
    res.render('celebrities/new-celebrity');
});

//Mostrar todas las celebrities
router.get('/celebrities', (req, res) => {
    Celebrity.find()
        .then(allCelebrities => res.render('celebrities/celebrities', { allCelebrities }))
        .catch(err => console.log(err));
});









module.exports = router;