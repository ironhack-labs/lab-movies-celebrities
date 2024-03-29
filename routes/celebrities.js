
const router = require("express").Router();



const Celebrity = require('../models/Celebrity.model');

router.get("/celebrities/create", (req,res,next)=> {

    res.render("celebreties/new-celebrity.hbs")
})

router.post ("/celebrities/create", async (req,res,next) => {

    try {

        const newCelebrity = new Celebrity(req.body);

        await newCelebrity.save(); 

        res.redirect("/celebrities"); 

        
    } catch (error) {

        res.render ("celebreties/new-celebrity.hbs", {error: "Please try again"}); 
    }

   
}); 

router.get ("/celebrities", async (req,res,next) => {

try {

    const celebrities = await Celebrity.find(); 
    res.render ("celebreties/celebrities.hbs", {celebrities}); 
} catch (error) {
    console.error(error); 
    res.status(500).send("Something went wrong"); 
}

}); 

module.exports = router;