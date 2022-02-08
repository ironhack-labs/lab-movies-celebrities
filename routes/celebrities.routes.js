const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res) => {
    res.render("celebrities/celebrities")
});

router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity")
});

router.post("/create", (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({name, occupation, catchPhrase})
    .then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("Error creating new Celebrity: ", err);
        res.render("celebrities/new-celebrity");
    })
    
});

module.exports = router;