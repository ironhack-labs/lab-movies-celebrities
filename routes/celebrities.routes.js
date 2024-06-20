// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")


// all your routes here

router.get("/celebrities/create", (req, res, next) => {
    res.render ("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    console.log(req.body)
    const newCeleb = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase 
    }

    Celebrity.create(newCeleb)
    .then( (celebFromDB) => {
        console.log(celebFromDB)
        res.redirect("/celebrities")
    })
    .catch( e => {
        console.log("Error adding new celebrity", e)
        res.render("celebrities/new-celebrity")
        next(e);
    })
})

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((listOfCeleFromDB) => {
            res.render("celebrities/celebrities", {celebritiesArr: listOfCeleFromDB})
        })
        .catch(e => next(e))
})



module.exports = router