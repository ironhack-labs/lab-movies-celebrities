const express = require("express");
const Celebrity = require("../models/celebrity.model");
const router = express.Router();


router.get("/new", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
});
router.post("/new", (req, res, next) => {
    Celebrity.create(req.body)
    .then((result) => {
        console.log(result)
        res.redirect("/all")
    }).catch((err) => {
        console.log(err);
        res.redirect("/new")
        
    });
});
module.exports = router;
