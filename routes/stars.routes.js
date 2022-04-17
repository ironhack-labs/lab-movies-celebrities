const express = require('express');
const router = express.Router();

const Star = require('./../models/Star.model')

// all your routes here
router.get('/stars/create', (req, res) => {
    Star
        .find()
        .then(() => {
            res.render('stars/new-star')
        })
        .catch(err => console.log(err))
})

router.post('/stars/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Star
        .create({ name, occupation, catchPhrase })
        .then(() => {
            // res.send('funciono') DA ERROR PORQUE TODAVÍA NO ESTÁ CREADO /stars
            res.redirect('/stars')
        })
        .catch(err => console.log(err))
})

router.get('/stars', (req, res, next) => {
    Star
        .find()
        .then(stars => {
            res.render('stars/stars', { stars })
        })
        .catch(err => console.log(err))
});


module.exports = router;