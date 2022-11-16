// const app = require("../app")
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


router.get("/celebrities", (req, res, next) => {
    return Celebrity.find()
    .then((allCelebrities) => {
        res.render("celebrities/celebrities.hbs", { celebrity: allCelebrities });
    })
    .catch((error) => {
        console.log("Error while getting the Celebrities from the DB: ", error);
    });
});

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
});

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.redirect("/celebrities"))
        .catch((error) => res.render("/celebrities/new-celebrity"));
});

module.exports = router;