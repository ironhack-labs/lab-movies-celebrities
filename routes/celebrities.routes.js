const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// GET the create form
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

// POST create a new celebrity
router.post("/celebrities/create", (req, res, next) => {
    // console.log(req.body);

    Celebrity.create(req.body)
        .then((result) => {
            // console.log(result);
            res.redirect("/celebrities");
        })
        .catch((err) => {
            console.log("Could not create new celebrity. ", err);
            console.error(err);
            res.redirect("/celebrities/create");
        });
});


router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((response) => {
            const data = {
                celebritiesArray: response
            };
            res.render("celebrities/celebrities", data)

        })
        .catch((err) => {
            console.log("Could not find celebrities. ", err);
            console.error(err);
        });
});
module.exports = router;
