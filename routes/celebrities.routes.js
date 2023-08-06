const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');


router.get("/celebrities/create", (req, res) => {

    res.render("celebrities/new-celebrity")

});

router.post("/celebrities/create", (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect("/celebrities"))
        .catch(err => console.log(err))
})



router.get("/celebrities", (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render("celebrities/celebrities", { celebrities }))
        .catch(err => console.log(err))
})


router.get("/celebrities/:id", (req, res) => {
    const celebrityId = req.params.id;

    Celebrity.findById(celebrityId)
        .then((celebrity) => {
            res.render("celebrities/celebrity-details", { celebrity });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/celebrities");
        });
});


router.get("/celebrities/:id/edit", (req, res) => {

    const celebrityId = req.params.id;

    Celebrity
        .findById(celebrityId)
        .then((celebrity) => {
            res.render("celebrities/edit-celebrity", { celebrity });
        })
        .catch((error) => {
            console.log(error);
            res.redirect("/celebrities");
        });
});

router.post("/celebrities/:id/edit", (req, res) => {

    const celebrityId = req.params.id;

    const { name, occupation, catchPhrase } = req.body;

    Celebrity
        .findByIdAndUpdate(celebrityId, { name, occupation, catchPhrase })
        .then((updatedCelebrity) => {
            res.redirect("/celebrities/" + celebrityId);
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/celebrities");
        });
});

router.post("/celebrities/:id/delete", (req, res) => {
    const celebrityId = req.params.id;

    Celebrity
        .findByIdAndDelete(celebrityId)
        .then(() => {
            res.redirect("/celebrities");
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/celebrities");
        });
});
module.exports = router;


