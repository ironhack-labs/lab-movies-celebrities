const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");


router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {

    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(celebrityDetails)
        .then(() => {
            res.redirect("/celebrities");
        })
        .catch((error) => {
            console.log("Error creating a celebrity in DB", error);
            res.render("celebrities/new-celebrity")
        })
})

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((result) => {
            res.render("celebrities/celebrities", { result })
        })
        .catch((error) => {
            console.log("Error listing celebrities from DB", error);
            next(error);
        })
})





module.exports = router;