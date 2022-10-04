// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Celebrity = require('../models/Celebrity.model');

const router = require("express").Router();

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})

router.post('/celebrities/create', (req, res, next) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchphrase: req.body.catchPhrase,
    }
    Celebrity.create(celebrityDetails)
    .then((celebrityDetails) => {
        res.render('celebrities/celebrities');
    })
    .catch((err) => {
        res.redirect('/celebrities/new-celebrity');
    })
});

module.exports = router;