const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const router = require("express").Router();


router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celebrity.create(celebrityDetails)
    .then(() => {
        res.redirect("/celebrities")
    })
    .catch((err) => {
        console.log("Error creating celebrity in the DB", err);
        res.render("celebrities/new-celebrity");
        next(err);
      });

})

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDB) => {
        const data = {
            celebritiesArr : celebritiesFromDB,
        } 
        res.render("celebrities/celebrities", data)
    })
    .catch((err) => {
        console.log("Error getting celebrities from the DB", err);
        next(err);
    })
})

module.exports = router;