// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
// all your routes here
// GET route to display the form to create new celebrity
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
})

//POST route to get the info of the new celebrity from form and save in DB
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
        .then(celebrityFromDB => {
            console.log(`New celebrity created: ${celebrityFromDB}.`)
            res.redirect("/celebrities")
        })
        .catch(err => {
            console.log(err);
            res.render("celebrities/new-celebrity");
        })
})

//Get route to list all celebrities on /celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render("celebrities/celebrities.hbs", {celebritiesFromDB})
        })
        .catch(err => {
            console.log('Error listing celebrities: ', err)
            next(err)
        })
})

module.exports = router;