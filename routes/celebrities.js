const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
        console.log(celebritiesFromDB)
        res.render("celebrities/celebrities", { celebrities: celebritiesFromDB })
    })
    .catch(err => next(err))
})

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    console.log(req.body)
    const { name, occupation, catchPhrase } = req.body

    Celebrity.create({ name: name, occupation: occupation, catchPhrase: catchPhrase })
        .then(createdCelebrity => {
            console.log(createdCelebrity)
            res.redirect("/celebrities") 
        })
        .catch(err => { 
            next(err)
            if (err) res.render("celebrities/new-celebrity") 
        })
})


module.exports = router;