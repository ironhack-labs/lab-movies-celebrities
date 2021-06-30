// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


router.get("/create-celebrity", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create-celebrity", async (req, res) => {
    try{
        const { name, occupation, catchPhrase } = req.body;
        await Celebrity.create({
            name,
            occupation,
            catchPhrase,
        });
        res.redirect("/create-celebrity");
    } catch (e){
        console.log(e);
        res.redirect("/create-celebrity");
    }
});

router.get("/celebrities", async (req, res) => {
    try{
        const allCelebrities = await Celebrity.find();
        res.render("celebrities/celebrities.hbs", {allCelebrities});
    } catch (e){}
});

 

module.exports = router;
