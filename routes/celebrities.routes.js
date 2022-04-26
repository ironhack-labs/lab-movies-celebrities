const Celeb = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/celebrities/create", (req, res, next) => {
    Celeb.create()
    .then((celebsArr) => {

        console.log(celebsArr);

        res.render("celebrities/new-celebrity", {celebs: celebsArr})
    })
    .catch(err => {
        console.log("error getting celebs from DB", err)
        next(err);
    })
});

router.post("/celebrities/create", (req, res, next) => {
    const newCeleb = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celeb.create(newCeleb)
        .then((celebFromDB) => {
            res.redirect("/celebrities/celebrities")
        })
        .catch(err => {
            res.redirect("/celebrities/new-celebrities")
            next(err);
        })
})



module.exports = router;