const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
    try {
        const { name, occupation, catchPhrase } = req.body;
        await Celebrity.create({
            name,
            occupation,
            catchPhrase,
          });
          res.redirect("/celebrities");
    } catch (error) {
        console.log("An error accurred", error);
    }
});

router.get("/celebrities", async (req, res) => {
    const celebrities = await Celebrity.find().sort({ name: 1 });
    res.render("celebrities/celebrities", {celebrities});
});

router.get("/celebrities/:celebrityId", async (req, res) => {
    const celebrityDetail = await Celebrity.findById(req.params.celebrityId);
    res.render("celebrities/celebrities-detail", celebrityDetail);
});


module.exports = router;