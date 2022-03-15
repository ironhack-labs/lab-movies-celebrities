// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
    //console.log(req.body);

    try {
        const userCreatedCelebrity = new Celebrity({
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase,
        })

        await userCreatedCelebrity.save();

        res.redirect("/celebrities");
    } catch (err) {
        console.error(err);
        res.render("celebrities/new-celebrity");
    }

});

router.get("/celebrities", async (req, res) => {

    try {
        const listAllCelebrities = await Celebrity.find();
        console.log(listAllCelebrities);
        res.render("../views/celebrities/celebrities", { allTheCelebrities: listAllCelebrities });
    } catch (err) {
        console.error(err);
    }

});

module.exports = router;