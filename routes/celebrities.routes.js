// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celeb = require("../models/Celebrity.model");

// all your routes here


router.get("/celebrities/create", (req, res, next) => {

    Celeb.create()
        .then((celebsArr) => {
            console.log(celebsArr);
            res.render("celebrities/new-celebrity", {celebs: celebsArr});
        })
        .catch(err => {
            console.log("error getting celebs from DB", err)
            next(err);
        });

});

router.post("/celebrities/create", (req, res, next) => {

    const newCeleb = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celeb.create(newCeleb)
        .then((celebFromDB) => {
            res.redirect("/celebrities");
        })
        .catch(err => {
            res.redirect("/celebrities/new-celebrity")
            console.log("error creating celeb in DB", err)
            next(err);
        });

});


module.exports = router;