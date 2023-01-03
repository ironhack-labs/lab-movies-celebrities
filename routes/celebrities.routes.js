const CelebrityModel = require("../models/Celebrity.model");

const router = require("express").Router();

//CREATE: display form
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

//CREATE: process form
router.post("/celebrities/create", (req, res, next) => {
    const celebritydetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    CelebrityModel.create(celebritydetails)
        .then(celebritydetails => {
            res.redirect("/celebrities");
        })
        .catch(err => {
            console.log("error creating new celebrity in DB", err);
            next();
        })
})

//READ: List all the celebrities
router.get("/celebrities", (req, res, next) => {
    CelebrityModel.find()
        .then(celebritiesFromDB => {
            res.render("celebrities/celebrities", { celebrities: celebritiesFromDB})
        })
        .catch(err => {
            console.log("error creating new celebrity in DB", err);
            next();
        })
})

module.exports = router;