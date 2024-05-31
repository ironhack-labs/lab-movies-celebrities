const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res) => {
    console.log('testing...')
    Celebrity.find().then((data) => {
        res.render("celebrities/celebrities", {celebrities: data});
    });
});

router.get(`/create`, (req, res) => {
    res.render(`celebrities/new-celebrity`);
});

router.post(`/create`, (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect(`/celebrities`))
});



module.exports = router;
