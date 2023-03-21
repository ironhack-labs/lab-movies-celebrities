// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities/create",(req, res, next) => {
    res.render("celebrities/new-celebrity")
});


//POST
router.post("/celebrities/create", (req, res, next) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    };

    Celebrity.create(celebrityDetails)
        .then((result) => {
            console.log(result);
            res.redirect("/celebrities");
        }).catch((err) => {
            console.error(err);
            next(err);
        });
    
});

module.exports = router;