const router = require("express").Router();
// const bcrypt = require('bcrypt')

const Celebrity = require('../models/Celebrity.model')

/* GET home page */
router.get("/celebrities", (req, res, next) => {
    Celebrity
    .find({})
    .then( celebrities => {
        // res.send(celebrities)
        res.render('celebrities/celebrities', {celebrities})
    })
    // 
//   res.render("index");
});

router.get("/celebrity/create", (req, res, next) => {
    res.render('celebrities/new-celebrity')
//   res.render("index");
});

router.post("/celebrity/create", (req, res, next) => {
    const celebrity = req.body
    const {name, ocupation, image, catchPhrase} = celebrity
    const validationConst = name && ocupation && image && catchPhrase

    if(!validationConst){
        res.render('celebrities/new-celebrity', {errorMessage: `All fields are mandatory.`})
        return
    }
    

    Celebrity
        .findOne({name})
        .then( foundCeleb => {
            if(foundCeleb){
                res.render('celebrities/new-celebrity', {errorMessage: `You are already registered, ${name}`})
                return
            }
        })

    Celebrity
        .create( celebrity)
        .then( () => res.redirect('/celebrities'))
        .catch(err => console.log(err))

});



module.exports = router;