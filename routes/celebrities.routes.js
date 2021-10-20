const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})


router.post("/celebrities/create", (req, res, next)=>{
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({name, occupation, catchPhrase})
        .then (() => {
            res.redirect("/celebrities")
        })
        .catch((err) => {
            console.log("Error getting the information from the form created for celebrities", err);
            res.redirect("/celebrities")
        })

})

router.get("/celebrities",(req, res, next) => {
    Celebrity.find()
    .then((allCelebritiesFromDB) => {
        const data = {
            celebritiesArr : allCelebritiesFromDB
        }
        res.render("celebrities/celebrities", data)
    })
    .catch((err) => {
        console.log("Error displaying the information from the form created for celebrities", err);
        res.redirect("/celebrities")
    })
})

// all your routes here

module.exports = router;
