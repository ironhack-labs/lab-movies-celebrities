const Celebrity = require("../models/Celebrity.model");

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
        console.log("ups, an error has been detected getting the information from the create form", err);
        res.redirect("/celebrities")
    })

})


router.get("/celebrities",(req, res, next) => {
    Celebrity.find()
    .then((allCelebritiesFromDB) => {
        // console.log("Celebrities", allCelebritiesFromDB)
        const data = {
            celebritiesArr : allCelebritiesFromDB
        }
        res.render("celebrities/celebrities.hbs", data)

    })
    .catch()

    


})

// all your routes here

module.exports = router;
