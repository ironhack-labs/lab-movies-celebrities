const express = require('express');
const router = express.Router();

// require the Drone model here
const Celeb = require("../models/Celebrity.model");

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')    
});

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase, ... rest} = req.body

    Celeb.create({name, occupation, catchPhrase})
    .then(celeb => {
        res.redirect('/celebrities')
    })
    .catch(err => {
        console.log(err)
        res.send('Error')
    })
});


router.get('/celebrities', (req, res, next) => {
    Celeb.find()
    .then(celebs =>{
        res.render('celebrities/celebrities', {celebs})
    })
    .catch(err => {
        console.log(err)
        res.send('Error')
    })
});



module.exports = router;
