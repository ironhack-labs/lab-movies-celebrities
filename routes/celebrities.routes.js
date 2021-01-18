const express = require("express");
const router = express.Router();

const Celebrity = require("../models/celebrity.model");
// const Author = require("../models/Author.model");

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDB) => {
    console.log("celebrities: ", celebritiesFromDB);

    res.render("celebrities/celebrities.hbs", { celebritiesFromDB });
    })
    .catch((err) => console.log(`Error while getting all the celebrities from DB: ${err}`));
});

router.get("/celebrities/new", (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDb) => res.render("celebrities/new-celebrity.hbs", { celebritiesFromDb }))
    .catch((err) => console.log(`Error while displaying the form to create a new celebrity: ${err}`));
});

// POST route to save the book inside the celebrities collection in the DB
router.post("/celebrities/create", (req, res, next) => {
    // console.log("new celebrity: ", req.body);

    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
    .then((savedCelebrity) => {
        // console.log(savedCelebrity);
        res.redirect("/celebrities");
    })
    .catch((err) => console.log(`Error while saving a new celebrity to DB: ${err}`));
});

router.post("/celebrities/:id/delete", (req, res, next) => {
    Celebrity.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => console.log(`Error while deleting the celebrity from DB: ${err}`));
});

// GET route to render the book we want to update
router.get("/celebrities/:id/edit", (req, res, next) => {
    Celebrity.findById(req.params.id)
    // .populate("author")
    .then((foundCelebrity) => {
        // console.log("found celebrity: ", foundCelebrity);

        res.render("celebrities/edit-celebrity.hbs", { foundCelebrity });
    })
    .catch((err) => console.log(`Error while getting the celebrity from DB for editing: ${err}`));
});

router.post("/celebrities/:id/update", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase }, { new: true })
    .then((updatedCelebrity) => {
        // console.log("updated:", updatedCelebrity);

        res.redirect(`/celebrities/${updatedCelebrity._id}`);
    })
    .catch((err) => console.log(`Error while saving the updates on a specific celebrity: ${err}`));
});

router.get("/celebrities/:id", (req, res, next) => {
    // console.log("ID: ", req.params.id);
    Celebrity.findById(req.params.id)
    // .populate("author")
    .then((foundCelebrity) => {
        // console.log(foundBook);
        res.render("celebrities/celebrity-details.hbs", { foundCelebrity });
    })
    .catch((err) => console.log(`Error while getting the celebrity details from DB: ${err}`));
});


module.exports = router;