const express = require('express');
const router = express.Router();

const Celebrity = require('./../models/Celebrity.model.js')


//CREATE CELEBRITY
router.get('/celebrities/create', (req, res) => {

    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities/create'))
        .catch(err => console.log(err))
})

//ALL CELEBRITIES

router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .then(allCelebrities => {
            res.render('celebrities/celebrities', { allCelebrities })

        })
        .catch(err => console.log(err))
})



module.exports = router