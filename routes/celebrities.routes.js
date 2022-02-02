// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req,res,next) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', (req,res,next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.findOne({name})
        .then((celeb) => {
            if(!celeb){
                Celebrity.create({name, occupation, catchPhrase})
                    .then(() => res.redirect('../celebrities'))
            }
            else{
            //Celeb already created
            }
        })
        //res.render('celebrities');
        .catch(err => {
            console.log('Error while creating celebrity: ' + err);
            res.render('/celebrities/new-celebrity');
    })
});

router.get('/celebrities', (req,res,next) => {
    Celebrity.find()
        .then(allCelebs => {
            if(allCelebs){
                res.render('celebrities/celebrities',{celebs: allCelebs})
            }
        })
        .catch(err => console.log('Error while listing celebrities: ' + err));
});

module.exports = router;