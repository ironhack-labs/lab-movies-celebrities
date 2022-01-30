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


module.exports = router;