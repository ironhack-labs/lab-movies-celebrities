const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", async (req, res) => {

    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
    try {
        const {name, occupation, catchprase} = req.body;
        await Celebrity.create({
        name,
        occupation,
        catchprase
    });
    res.redirect("/celebrities");
    }
    catch(e) {
        console.log(e);
        res.redirect("/celebrities/create");
    }    
});

router.get("/celebrities", async (req, res) => {
    try{
        const calebritiesList = await Celebrity.find();
        res.render("celebrities/celebrities", {calebritiesList});
    }
    catch(e){
        res.redirect("/error");
    }   
});



module.exports = router;