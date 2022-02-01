// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { find } = require("../models/Celebrity.model.js");
const Celebrity = require('../models/Celebrity.model.js');



router.get('/create', (req, res) => res.render('celebrities/new-celebrity.hbs'));

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch(error => next(error));
});

router.get('/', (req, res) => {
    Celebrity.find()
    .then((celebrities) => res.render('celebrities/celebrities.hbs', { celebrities } ))


})



// all your routes here

module.exports = router;