// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


// all your routes here

const Celebrity = require('../models/Celebrity.model');

// Create new celebrity
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {

    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };


    Celebrity.create(newCelebrity)
        .then( (newCelebrity) => {
            res.redirect("/celebrities");
        })
        .catch( e => {
            console.log("error creating new celebrity", e);
            res.redirect("/celebrities/new-celebrity");
            next(e);
        });
});

// List all celebrities
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then( (celebritiesFromDB) => {

            const data = {
                celebrities: celebritiesFromDB
            }

            res.render("celebrities/celebrities", data);
        })
        .catch( e => {
            console.log("error getting list of celebrities from DB", e);
            next(e);
        });
});

module.exports = router;