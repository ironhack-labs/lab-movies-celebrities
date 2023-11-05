// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs");
});

router.get("/celebrities", (req, res) => {
    Celebrity.find()
        .then((celebritiesArr) => {
            res.render("celebrities/celebrities.hbs", { celebritiesArr });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post("/celebrities/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;