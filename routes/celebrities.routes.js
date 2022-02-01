// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//require the model
const Celebrity = require("../models/Celebrity.model");

//GET route to display form to create a celebrity
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs');
});

//POST route to post info about new celebrity
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch((error) => res.render('celebrities/new-celebrity.hbs'));
});

// all your routes here

module.exports = router;
