
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
    Celebrity.create()
        .then(celebrity => {
            res.render("celebrities/new-celebrity", { celebrity })
        })
        .catch(err => next(err))
})

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity.create({name, occupation, catchPhrase})
        .then(createdCelebrity => {
            console.log(createdCelebrity)
            res.redirect("/celebrities")
        })
        .catch(err => {next(err)
        res.render("celebrities/new-celebrity")})
})


router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render("celebrities/celebrities", { celebrities: celebritiesFromDB })
        })
        .catch(err => next(err))
})


module.exports = router;