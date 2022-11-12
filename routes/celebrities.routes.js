const express = require('express');
const router = express.Router();

const CelebrityModel = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
    // console.log('la ruta desde celebrities funciona')
});

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, cathPhrase } = req.body

    CelebrityModel
        .create({ name, occupation, cathPhrase })
        .then(newCelebrity => {
            res.redirect('/celebrities')
        })
        .catch(err => {
            console.log(err)
            res.redirect('celebrities/new-celebrity')
        })
})

module.exports = router;