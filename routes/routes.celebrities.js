const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');


// all your routes here

router.get("/celebrities/create", (req,res,next) => {
     Celebrity.create()
    .then((celebArr) => {
        res.render("celebrities/new-celebrity", celebArr)
    })
    .catch( err => console.log('there was an error ',err))
})


router.post("/celebrities/create", (req,res,next) => {

    const newCeleb = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celebrity.create(newCeleb)
        .then((celebOfDB) => {
         res.redirect("/celebrities")
        })
        .catch(eer => {
            console.log("there was an error creating a celeb: ",err)
                        res.render("celebrities/new-celebrity")})
        .next()
    })

module.exports = router;


