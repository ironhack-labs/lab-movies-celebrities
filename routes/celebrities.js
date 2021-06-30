const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

//create celebrities
router.get('/create-celebrity', (req, res) => {
    res.render("celebrities/new-celebrity");
});

router.post('/create-celebrity', async (req, res) => {   
     const { name, occupation, catchphrase } = req.body;
await Celebrity.create({
    name,
    occupation,
    catchphrase,
});
res.redirect("/celebrities");
});

//view celebrities
router.get("/celebrities", async (req, res) => {
    const celebrityFound = await Celebrity.find().populate("cast", "name");
    res.render("celebrities/celebrities", { celebrityFound });
});



module.exports = router;