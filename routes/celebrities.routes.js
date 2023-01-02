// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create", (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("celebrities/new-celebrity", { celebrities });
        })
        .catch(err => {
            console.log('Error getting authors from DB...', err);
            next(err);
        })
});

router.post("/celebrities/create", (req, res, next) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }

    Celebrity.create(celebrityDetails)
        .then(celebrityDetails => {
            res.redirect("/celebrities");
        })
        .catch(err => {
            console.log("error creating new book in DB", err);
            res.render("celebrities/new-celebrity");
            next();
        })
});

module.exports = router;