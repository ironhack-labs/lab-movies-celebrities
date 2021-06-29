const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity");
});


router.post("/celebrities/create", async (req, res)=>{
    const {name, occupation , catchPhrase} = req.body;
    await Celebrity.create ({
        name,
        occupation,
        catchPhrase,
    });
    res.redirect("/celebrities");
});


router.get('/celebrities', async (req, res) => {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", {allCelebrities});
})

module.exports = router;