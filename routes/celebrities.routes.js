const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

// all localhost:3000/celebrities routes here:
router.get("/", (req, res, next) => {
    // what is the list is empty? 
    // Puedo mandar dos objectos a la pagina de celerities? como un errorMessage
    // Puedo utilisar algo como req session?
    Celebrity
    .find({})
    .then( celebrities => {
        res.render('celebrities/celebrities', {celebrities})
    })
    .catch(err => console.log(err))

});

router.get("/create", (req, res, next) => {
    res.render('celebrities/new-celebrity')
});

router.post("/create", (req, res, next) => {
    // const celebrity = req.body
    // const {name, ocupation, image, catchPhrase} = celebrity
    const {name, occupation, image, catchPhrase} = req.body
    const validationConst = name && occupation && image && catchPhrase

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

//*********** The render from line 35 stops the flow and we do not get to 41 if name already exists. Right? */
    Celebrity
        // .create( celebrity)
        .create( {name, occupation, image, catchPhrase} )
        .then( () => res.redirect('/celebrities'))
        .catch(err => console.log(err))

});



module.exports = router;