const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity.model')

//add new celebrity
router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
});

router.post('/celebrities/create', (req, res, next) => {
    
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
    .then(res.redirect('/celebrities'))
    .catch((err) => console.log(`There was an error saving the Celebrity: ${err}`));
    res.redirect('back')
});

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDB) => 
        res.render('celebrities/celebrities.hbs', { celebritiesFromDB }))
    .catch((err) => 
        console.log(`There was an error retrieving the celebrities: ${err}`));
});


module.exports = router;
