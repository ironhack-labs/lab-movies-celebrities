const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .then(listFromDB => {
            res.render('celebrities/celebrities', {listFromDB})
        })
        .catch(err => console.log(`an error happened ${err}`));
})

router.get('/celebrity/create' , (req, res, next) =>{
    res.render('celebrities/new-celebrity')
});

router.post('/celebrity/create', (req, res, next) => {
    console.log("Hello, look what's inside",req.body)
    const {name, occupation, catchphrase} = req.body
    Celebrity.create({ name, occupation, catchphrase })
        .then(() => {
            res.redirect('/celebrities')
            console.log({name, occupation, catchphrase})
        })
        .catch(err => {
            res.render('celebrities/new-celebrity', { errorMessage: 'There was an error creating the celebrity. Try again!'});
        });
    //res.render('new-celebrity'));
} ),

module.exports = router;