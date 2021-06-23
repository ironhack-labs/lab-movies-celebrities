const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
} );

router.post("/create", (req, res, next) => {
    Celebrity.create(req.body)
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(() => {
            res.render("celebrities/new-celebrity")
        })
})

module.exports = router;