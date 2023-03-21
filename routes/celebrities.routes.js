const express = require('express');
const celebrity = require('../models/Celebrity.model');
const router = express.Router();

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
    const celebDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
celebrity.create(celebDetails)
    .then(celebFromDB => {
        res.redirect("/celebrities/new-celebrity");
    })
    .catch(e => {
        console.log("Error trying to create a  new celebrity", e)
        next(e);
    });
});

router.get("/celebrities", (req, res) => {
    
})

module.exports = router;