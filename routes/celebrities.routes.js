// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// Requiring Models
const Celebrity = require("../models/Celebrity.model");

// GET route to display all the celebrities int th DB
router.get("/celebrities", async (req, res) => {
    try {
        let allCelebritiesFromDB = await Celebrity.find();

        res.render("celebrities/celebrities.hbs", {
            celebrities: allCelebritiesFromDB,
        });
    } catch (error) {
        console.log("Error while getting celebrities", error);
    }
});

/* CREATE CELEBRITIES */
// Go to create page
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity.hbs");
});

// Post new celebrity and return to celebrities page
router.post("/celebrities/create", async (req, res) => {
    try {
        // Object destructuring
        const { name, occupation, catchPhrase } = req.body;
        //
        await Celebrity.create({ name, occupation, catchPhrase });
        res.redirect("/celebrities");
    } catch (error) {
        console.log("Error: " + error);
    }
});

// all your routes here
module.exports = router;
