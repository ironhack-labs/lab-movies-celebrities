const router = require("express").Router();
const express = require("express");
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((celebritiesFromDB) => {
            const data = {
                celebrities: celebritiesFromDB,
            };
            res.render("celebrities/celebrities.hbs", data);
        })
        .catch((e) => {
            console.log("Error getting list of celebrities from DB", e);
            next(e);
        });
});
// CREATE: display form
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity", data);
});

// CREATE: process form
router.post("/celebrities/create", (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    };

    Celebrity.create(newCelebrity)
        .then((newCelebrity) => {
            res.redirect("/celebrities");
        })
        .catch((e) => {
            console.log("error creating new celebrity", e);
            res.redirect("/celebrities/new-celebrity");
            next(e);
        });
});
module.exports = router;
