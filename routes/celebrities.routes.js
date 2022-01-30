//jshint esversion:8
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// all your routes here

/************************* CREATE CELEBRITY *****************************/

router.get('/celebrities/create', (req, res, next) =>  {

    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) =>  {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase})
        .then(celebrityFromDB => {
            
            console.log(celebrityFromDB);
            res.redirect('celebrities/celebrities');
        })

        .catch(err => {
            res.render('celebrities/new-celebrity');
            console.log('Something went wrong while creating new celebrity', err);
        });
});

/************************* ALL CELEBRITIES *****************************/

router.get('/celebrities', (req, res, next) =>  {

    Celebrity.find()
        .then( celebritiesFromDB => {
            console.log(celebritiesFromDB);
            res.render('celebrities/celebrities', {celebrities: celebritiesFromDB});
        })
        .catch(err => {
            console.log('Something went wrong while getting celebrities from DB', err);
        });
});

module.exports = router;