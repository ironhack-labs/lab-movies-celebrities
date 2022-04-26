const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

//READ celebrities
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((celebritiesArr) => {
        res.render("celebrities/celebrities", {celebrities: celebritiesArr})
    })
    .catch((err) => {
        console.log("Oops, there was an error!", err)
    })
    
})

//CREATING new celebrities

router.get("/celebrities/create", (req, res, next) => {
             res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {

    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }

    Celebrity.create(newCelebrity)
        .then((celebrityFromDB) => {
            res.redirect("/celebrities")
        })
        .catch((err) => {
            console.log("Oops, there was an error!", err)
            res.render("celebrities/new-celebrity")
        })
})






module.exports = router;