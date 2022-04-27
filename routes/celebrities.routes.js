const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// CREATE CELEBRITY: render form
router.get("/celebrities/create", (req, res, next) => {
            res.render("celebrities/new-celebrity");   
})

// CREATE CELEBRITY: process form
router.post("/celebrities/create", (req, res, next) => {

    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchphrase: req.body.catchphrase,
    }

    Celebrity.create(newCelebrity)
        .then((celebrityFromDB) => {
            res.redirect("create");
        })
        .catch(err => {
            console.log("error creating celebrity on DB", err)
            next(err);
        });

})

/* CELEBRITIES List page */
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((celebrityFromDB) => {
            //console.log(celebrityFromDB);
            res.render("celebrities/celebrities", {
                celebrities: celebrityFromDB
            })
        })
        .catch(err => console.log("oops, there was an error" + err))

})

module.exports = router;