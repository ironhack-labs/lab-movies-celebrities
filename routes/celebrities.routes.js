// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const app = require("../app");
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
});

router.post("/celebrities/create", (req, res) => {

    Celebrity.create(req.body)
        .then(() => {
            res.redirect("/celebrities");
        })
        .catch((error) => {
            console.log("Error creating new celebrity", error)
            res.render("celebrities/new-celebrity")
        });

});

router.get("/celebrities", (req, res) => {
    Celebrity.find()
    .then( result => {
        res.render("celebrities/celebrities", {result})
    })
    .catch((error) => {
        console.log("Error connecting to DB", error)
    });
});


module.exports = router;