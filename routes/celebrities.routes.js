const express = require('express');
const router = express.Router();



const Celebrities = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {


    const { name, occupation, catchPhrase } = req.body

    Celebrities
        .create(req.body)
        .then(celebrity => {
            // console.log(celebrity)
            res.redirect('/celebrities')
        })
        .catch(err => res.redirect('/celebrities/create')
        )
})

router.get('/celebrities', (req, res) => {

    Celebrities
        .find()
        .then(celebritiesDb => {
            res.render('celebrities/celebrities', { celebritiesDb })
        })
})






module.exports = router;