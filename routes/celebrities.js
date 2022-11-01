const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here

router.get("/celebrities/create", async (req, res, next) => {
    
        res.render("celebrities/new-celebrity")
    
});

router.post("/celebrities/create", async (req, res, next) => {
    try {
        const {name, occupation, catchPhrase} = req.body;

        const createdCelebrity = await Celebrity.create({name, occupation, catchPhrase });
        res.redirect(`/celebrities`);
    } catch(error){
        console.log(error);
        res.redirect(`/new-celebrity`)
    }
});

router.get("/celebrities", async (req, res, next) => {
    try {
        const getCelebrities = await Celebrity.find();
        res.render("celebrities/celebrities.hbs", {getCelebrities})
    } catch(error){
        console.log(error);
        next(error);
    }
})

module.exports = router;