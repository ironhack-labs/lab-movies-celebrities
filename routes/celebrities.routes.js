const router = require("express").Router();
const Celebs = require("../models/Celebrity.model");
//const Movie = require("../models/Author.model");

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrities")
});

router.post("/celebrities/create", (req, res, next) => {
    const celebDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
     
        Celebs
            .create(celebDetails)
            .then((celeb) => {
                res.redirect("/celebrities")
            })
            .catch(err => res.render("celebrities/new-celebrities"));

});

module.exports = router;