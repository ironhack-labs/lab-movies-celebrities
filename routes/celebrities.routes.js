const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");



router.get("/celebrities/create", (req, res, next) => {

    res.render("celebrities/new-celebrity");
})


router.post("/celebrities/create", (req, res, next) => {


    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchphrase: req.body.catchphrase
    }
    Celebrity.create(newCelebrity)
        .then((newCelebrity) => {
            res.redirect("/celebrities");
        })
        .catch(err => {
            res.render("celebrities/new-celebrity")
        })
});



router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then(celebritiesFromDB => {

            const data = celebritiesFromDB

            res.render("celebrities/celebrities.hbs", { data })
        })
        .catch(err => {
            next(err);
        })
});



module.exports = router;