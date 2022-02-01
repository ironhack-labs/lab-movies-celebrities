// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//require the model
const Celebrity = require("../models/Celebrity.model");

//GET route to display form to create a celebrity
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs');
});

//POST get all info abou new celeb user submitted from the form. use this to create a new celeb in the database
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch((error) => res.render('celebrities/new-celebrity.hbs'));
});

//GET all celebs and render the list
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((allCelebs) => {
        console.log('Retrieced celebs from DB:', allCelebs);
        res.render('celebrities/celebrities.hbs', { celebs : allCelebs});
    });
});

// all your routes here

module.exports = router;
