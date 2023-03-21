// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/new-celebrity", (req, res, next) => {
    
    const data = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
   
    Celebrity.create(data)
        .then( () => {
            res.render("views/celebrities")
        })
        .catch( (e) => res.render("views/new-celebrity"))
})


module.exports = router;