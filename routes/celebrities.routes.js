const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');


router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
});

router.post("/celebrities/create", (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };
    Celebrity.create(newCelebrity)
        .then((newCelebrity) => {
            res.redirect("/celebrities")
        })
        .catch(e => next("celebrities/new-celebrity"))
});

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            const data = {
                celebrities: celebritiesFromDB
            }
            res.render("celebrities/celebrities", data);
        })
        .catch(e => next(e))
});

module.exports = router;