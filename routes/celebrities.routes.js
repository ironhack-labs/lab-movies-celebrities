const express = require('express');
const celebrityRouter = express.Router();

const Celebrity = require("../models/Celebrity.model");
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js


// all your routes here
celebrityRouter.get("/new-celebrity", (req, res, next) => {

    res.render("celebrities/new-celebrity");
});

celebrityRouter.post("celebrities", (req, res, next) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchphrase: req.body.catchPhrase
    }
    Celebrity.create(celebrityDetails)
        .then((celebrityDetails) => res.redirect('/celebrities'))
        .catch((err) => res.redirect('/celebrities/new-celebrity'))
});


module.exports = celebrityRouter;

