// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/celebrity.model")

// all your routes here

router.get("/celebrities", (req, res) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("celebrities/celebrities", { celebrities })
        })
        .catch(err => {
            throw new err
        })
})

router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})

router.post("/create", (req, res) => {
    const celebrity = req.body
    Celebrity.create(celebrity)
        .then(() => {
            res.redirect("celebrities")
        })
        .catch(() => {
            res.redirect("/celebrities/create")
        })
})

module.exports = router;