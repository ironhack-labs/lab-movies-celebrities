const express = require('express');
const Celebrity = require('../models/Celebrity.model');
const router = express.Router();

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
    const celebDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

Celebrity.create(celebDetails)
    .then(celebFromDB => {
        res.redirect("/celebrities", celebFromDB);
    })
    .catch(e => {
        console.log("Error trying to create a  new celebrity", e)
        next(e);
        res.redirect("/celebrities/create")
    });
});

router.get("/celebrities", (req, res, next) => {
    
    Celebrity.find()
    .then( celebArray => {
        console.log(celebArray);
        
        const data = {
            celeb: celebArray,
        }
        res.render("celebrities/celebrities", data);
    })
    .catch(e => {
        console.log("Error trying to create a  new celebrity", e)
        next(e);
    });
    
})

module.exports = router;