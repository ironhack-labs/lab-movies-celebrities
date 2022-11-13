const express = require('express');
const router = express.Router();

const Celebrities = require('../models/Celebrity.model')


router.get('/celebrities/list', (req, res, next) => {

    Celebrities
        .find()
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            res.render('celebrities/list', { celebrities: celebritiesFromDB })
        })

});


router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrities
        .create(req.body)
        .then(celebrities => {
            res.redirect('/celebrities/list')
        })
        .catch(err => console.log(err))
});



module.exports = router;


