const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

// all localhost:3000/celebrities routes here:
router.get("/", (req, res, next) => {
    Celebrity
    .find({})
    .then( celebrities => {
        res.render('celebrities/celebrities', {celebrities})
    })

});

router.get("/create", (req, res, next) => {
    res.render('celebrities/new-celebrity')
});

router.post("/create", (req, res, next) => {
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