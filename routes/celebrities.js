const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) =>{
        res.render("celebrities/celebrities", {allCelebrities});
    })
    .catch((err) => console.error(err))
});


router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
});

router.post("/celebrities/create", (req, res) => {
    const {name, occupation, catchPhrase } = req.body;
    
    Celebrity.create ({name, occupation, catchPhrase})
    .then ((celebrity) => {
        res.redirect("/celebrities"); })
        .catch(() => res.render("celebrities/new-celebrity"));
        
    });
    



module.exports= router;