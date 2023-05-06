// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    
    const data = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
   
    Celebrity.create(data)
        .then( () => {
            res.redirect("/celebrities")
        })
        .catch( (e) => res.render("views/new-celebrity"))
})

router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then( celebsFromDB => {

            const data = {
                celebs: celebsFromDB,
            }
            
            res.render("celebrities/celebrities", data);
        })
        .catch( e => console.log("error getting celebs from DB", e))
})

module.exports = router;