// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

// route to display the new celebrity form / creation 
router.get("/create", (req,res) => {
    res.render("celebrities/new-celebrity");
});

// route to post /submit the new celebrity 
router.post("/create", async (req,res) => {
    try {
        const newCelebrity = await CelebrityModel.create(req.body);
        res.redirect("/celebrities/celebrities");
    }
    catch (err) {
        console.log(err);
        res.redirect("/celebrities/new-celebrity")};
});

// route to disaplay the list of created celebrities 
router.get("/celebrities", async (req,res) => {
    try {
        const allCelebrities = await CelebrityModel.find();
        res.render("celebrities/celebrities", {allCelebrities});
    }
    catch (err) {
        console.log(err)};
});

module.exports = router;



