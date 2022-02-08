const router = require("express").Router();
const Celebs = require("../models/Celebrity.model");
//const Movie = require("../models/Author.model");

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrities")
});

module.exports = router;