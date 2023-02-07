// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here

//show a list of the celebrities

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(CelebritiesFromDB => {
        console.log(CelebritiesFromDB)
        res.render("celebrities/celebrities", {celebrities: CelebritiesFromDB});
    })
    .catch(err => next(err))
})

//add a new celebrity 

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    console.log('body', req.body)
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
    .then(createdCelebrity => {
        res.redirect("/celebrities")
    })
    .catch(err => res.render("/celebrities/new-celebrity"))
})




module.exports = router;