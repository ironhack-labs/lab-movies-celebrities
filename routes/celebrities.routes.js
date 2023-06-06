const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})


// iteration 3
router.post("/celebrities/create", (req, res, next) =>{
    
    const newCeleb = {
        name: req.body.name,
        occupation: req.body.occupation, 
        catchPhrase: req.body.catchPhrase
    };
    Celebrity.create(newCeleb)
        .then((newCeleb)=>{ //not sure if newCeleb is what should go here...
            res.redirect("/celebrities")
        })
        .catch( e => {
            console.log("error creating new celeb", e);
            res.render("celebrities/new-celebrity")
            next(e);
        });

})


module.exports = router;