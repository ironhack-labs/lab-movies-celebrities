const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity.create({ name, occupation, catchPhrase })
    .then(createdCelebrity => {
        console.log(createdCelebrity)
        res.redirect(`/celebrities/`)
    })
    .catch(err => res.redirect(`/celebrities/create`))
})

module.exports = router;