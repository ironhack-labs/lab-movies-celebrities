// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

/* GET create celebrity page */
router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs");
});

/* GET celebrities page */
router.get("/", async (req, res, next) => {
    try{
        const allCelebrities = await Celebrity.find();
        res.render("celebrities/celebrities.hbs", { allCelebrities });
    } catch(err){
        console.log(err)
    }
});

/* POST create celebrity page */
router.post("/create", async (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    try{
        const newCelebrity = await Celebrity.create({name, occupation, catchPhrase})
        res.redirect("/celebrities")
    } catch(err){
        console.log(err)
        res.render("celebrities/new-celebrity.hbs");
    }
});



module.exports = router;