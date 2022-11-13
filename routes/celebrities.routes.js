const express = require('express');
const router = express.Router();

const CelebrityModel = require('../models/Celebrity.model')
const MovieModel = require('../models/Movie.model')


router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
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

router.get('/celebrities', (req, res, next) => {
   
    CelebrityModel
        .find()
        .then(celebritiesFromDB => {
            res.render('celebrities/celebrities', { celebrities: celebritiesFromDB })
        })
        .catch(err => console.log(err))
});

module.exports = router;