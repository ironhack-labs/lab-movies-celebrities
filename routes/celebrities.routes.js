const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();


router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    };

    Celebrity.create(celebrityDetails)
        .then(() => {
            res.redirect("/celebrities");
        })
        .catch((error) => {
            console.log("Error creating celebrity in the DB", error);
            next(error);
        })
});

router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then((celebritiesFromDB) => {
            const data = {
                celebritiesArr: celebritiesFromDB
            };


            res.render("celebrities/celebrities", data);
        })

        .catch((error) => {
            console.log("Error getting data from DB", error)
            next(error);
        })
});



module.exports = router;