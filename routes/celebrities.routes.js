// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create",(req,res) => {
    res.render("celebrities/new-celebrity.hbs");
});


// POST route to submit info about the new celebrity
router.post("/celebrities/create", async (req,res) => {
    try {
        const {name, occupation, catchPhrase} = req.body;

        await Celebrity.create({name, occupation, catchPhrase});
        res.redirect("/celebrities");
    }
    catch (error){
        console.log(error)
        res.render("celebrities/new-celebrity.hbs");
    }
});


router.get("/celebrities", async (req,res) => {
    try{
        let allCelebritiesFromDb = await Celebrity.find();

        res.render("celebrities/celebrities.hbs", {celebrities: allCelebritiesFromDb});

    }
    catch(error){
        console.log("Error while getting celebrities", error);
    }
});





module.exports = router;