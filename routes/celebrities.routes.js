const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model")

// all your routes here
router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})


router.post("/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect("/celebrities"))
        .catch(() => res.redirect("/celebrities/create"))
})

router.get("/", (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render("celebrities/celebrities", { celebrities }))
        .catch(err => console.log("ERROR", err))
})

module.exports = router;