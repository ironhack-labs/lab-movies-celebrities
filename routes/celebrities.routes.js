const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/celebrities/create", (req,res)=> {
    res.render("celebrities/new-celebrity", {otherCast: req.query.otherCast});
});

router.post("/celebrities/create", async (req, res)=>{
    try {
        const {name, occupation, catchPhrase } = req.body;
        const newCelebrity = { name, occupation, catchPhrase }
        const dbNewCelebrity = await Celebrity.create(newCelebrity);
        if (req.body.addAnother === "true") {
            res.render("celebrities/new-celebrity");
        } else {
        res.redirect("/celebrities");
        }
    } catch (error) {
        console.log(error);
        res.render("celebrities/new-celebrity");
    } 
});

router.get("/celebrities", async (req, res)=> {
    try {
        const dbCelebrities = await Celebrity.find();
        // res.send(dbCelebrities);
        res.render("celebrities/celebrities.hbs", { celebrities: dbCelebrities });
    } catch (error) {
        console.log(error);
        next(error);
    }
})









module.exports = router;