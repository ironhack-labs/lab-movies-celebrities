const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model")

router.get("/celebrities/create", (req, res) => {

    res.render("celebrities/new-celebrity")

})

router.post("/celebrities/create", (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celeb => {
            res.redirect("/celebrities")
        })
        .catch(x => {
            res.render("celebrities/new-celebrity")
        })
})

router.get("/celebrities", (req, res) => {

    Celebrity
        .find()
        .then(celeb => {
            res.render("celebrities/celebrities", { celeb })
        })
        .catch(err => console.log(err))
})

module.exports = router;