const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model");



router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
    
})

router.post("/celebrities/create", async (req, res, next) => {
    try {
        const {name, occupation, catchphrase} = req.body
       await Celebrity.create({name, occupation, catchphrase})
        res.redirect("/celebrities");
    } catch (error) {
        console.log(error)
        next(error)
        res.redirect("/new-celebrity");
    }
});

router.get("/celebrities", async (req, res, next) =>{
    try {
        let celebs = await Celebrity.find()
        res.render("celebrities/celebrities", {celebs})
        console.log(celebs);

    } catch (error) {
           console.log(error);
           next(error);
    }
})

module.exports = router;