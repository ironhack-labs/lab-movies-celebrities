// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebtity")

})

/*router.post("/celebrities/create", (req, res, nex) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celebrity.create(newCelebrity)
    .then( () => {
        res.redirect("celebrities/celebrities")

    })
    .catch(()=>{
        res.render("celebrities/new-celebtity")
    })
}) */

module.exports = router;
