const router = require("express").Router()
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
    .catch(err => next(err))
})

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase} = req.body

    Celebrity.create({ name, occupation, catchPhrase})
        .then(createdCelebrity => {
            console.log(createdCelebrity)
            res.redirect("/celebrities")
        })
        .catch(err => res.redirect("celebrities/new-celebrity"))
})

router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then(allCelebrities => {
            console.log(allCelebrities)
            res.render("celebrities/celebrities", {celebrity : allCelebrities})
        })
})

module.exports = router