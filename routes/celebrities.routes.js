// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express');
const router = express.Router();

const Celebrity = require('./../models/Celebrity.model')

router.get("/", )

// Create list
router.get('/celebrities/create', (req, res, next) => {

    res.render('celebrities/new-celebrity');

});

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    console.log(req.body)
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            console.log(req.body)
            res.redirect(`/celebrities/new-celebrity`)
        })
        .catch(err => console.log(err))
});

router.get('/celebrities', (req, res, next) => {
    // 
    Celebrity
        .find()

        .then((data) => {
            console.log(data)
            res.render('celebrities/celebrities', { data })

        })
        .catch(err => console.log(err))
});



// all your routes here

module.exports = router;