// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((celebridades) => {
            res.render("celebrities/celebrities", { celebridades })
        })
        .catch(console.log)
})


router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    //req.body {
    // name, occupation, catchPhase
    //}
    Celebrity.create(req.body)
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(() => {
            res.render("celebrities/new-celebrity")
        })

    // const famoso = new Celebrity() Instancia de una nueva Celebrity
})

module.exports = router;