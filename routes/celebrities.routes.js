const CelebModel = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity.hbs");
});
router.post("/create", async (req, res) => {
    try {
    const newCeleb = await CelebModel.create(req.body);
    console.log(newCeleb);
    res.redirect("/celeb/celebrities");
    } catch (err) {
        console.log(err);
    }
});
router.get("/celebrities", async (req, res) => {
    try {
        const allCelebs = await CelebModel.find();
        console.log(allCelebs);
        res.render("celebrities/celebrities.hbs", { allCelebs });
    } catch (err) {
        console.log(err);
    }
})
module.exports = router;