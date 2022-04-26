// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celeb = require("../models/Celebrity.model");

// all your routes here


// Add new celebs - Show a form to create a celebrity
router.get("/celebrities/create", (req, res, next) => {
        res.render("celebrities/new-celebrity");
        });
      
// Add new celebs - send data to this route to create celeb + save to DB
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


// List all celebs
router.get("/celebrities", (req, res, next) => {
    Celeb.find()
    .then((celebsArr) => {
        res.render("celebrities/celebrities.hbs", {celebs: celebsArr})
    })
    .catch(err => {
        console.log("error getting celebs from DB", err)
        next(err);
    });
})


module.exports = router;