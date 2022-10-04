

const router = require('express').Router();
const Celebrity = require("../models/Celebrity.model");

router.get('/celebrities/create', (req, res, next) => {
   // console.log(res.body);
    res.render("celebrities/new-celebrity");
})

router.post('/celebrities/create', (req, res, next) => {

    const celebrityDetails = {

        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }

    Celebrity.create(celebrityDetails)
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(err => {

            console.log("error creating new author in DB", err)
            next(err);
        })
})

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((celebritiesFromDB) => {
            res.render("celebrities/celebrities", { celebritiesFromDB })
        })
        .catch(err => {

            console.log("error reading celebrities in DB", err)
            next(err);
        })
})

module.exports = router;