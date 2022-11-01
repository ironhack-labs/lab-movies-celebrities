const router = require("express").Router();
const Celeb = require("../models/Celebrity.model")

// all your routes here

router.get("/celebrities/create", (req, res, next) => res.render("celebrities/new-celebrity"));

router.post("/celebrities/create", async (req, res, next) =>{
    const {name, occupation, catchPhrase} = req.body;

    try {
        await Celeb.create({name, occupation, catchPhrase});
        res.redirect("/celebrities");

    } catch (error) {
        //render again this
        console.log(error);
        next(error);  
    }
})

router.get("/celebrities", async (req, res, next) => {

    try {
        const allCelebs = await Celeb.find();
        res.render("celebrities/celebrities", {allCelebs});
        
    } catch (error) {
        console.log(error);
        next(error);
    }

})

module.exports = router;