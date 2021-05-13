const express = require("express");
const router = express.Router();
const CelebrityModel = require("./../models/Celebrity.model");



// --- Get - Display All celebrities --- //
router.get("/all", (req, res, next) => {
    CelebrityModel.find()
        .then((dbSucces) => {
            res.render("celebrities/index.hbs", { celebrities: dbSucces })
        })
        .catch((err) => next(err))
});


// --- Get - Add one celebrity --- //
router.get("/new", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs");

});
// --- POST new-celebrity.hbs --- //


router.post("/create", (req, res, next) => {
    CelebrityModel.create(req.body)
        .then((dbSucces) => {
            res.redirect("/celebrities/all");
        })
        .catch((err) => {
            res.render("celebrities/new-celebrity.hbs");
        })
});




// --- Get celebrity-details.hbs --- //

router.get("/details", (req, resn) => {
    res.render("celebrities/celebrity-details.hbs")
})
/*
router.get("/celebrities/new", async (req, res, next) => {
    try {
        const celebrities = await CelebrityModel.find();
        res.render("celebrities/new-celebrity.hbs", {celebrities});
    } catch(dbErr) {
        next(dbErr)
    }
}); */

module.exports = router;