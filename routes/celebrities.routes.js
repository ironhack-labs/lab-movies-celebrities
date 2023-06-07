const router = require("express").Router();


const Celebrity = require('../models/Celebrity.model');



// READ: display all books
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then( (celebritiesFromDB) => {

            const data = {
                celebrities: celebritiesFromDB
            }

            res.render("celebrities/celebrities", data);
        })
        .catch( e => {
            console.log("error getting list of celebrities from DB", e);
            next(e);
        });
});



// CREATE: display form
router.get("/celebrities/create", (req, res, next) => {
    Celebrity.find()
        .then( celebritiesFromDB => {
            res.render("celebrities/new-celebrity", {celebritiesArr: celebritiesFromDB});
        })
        .catch( e => {
            console.log("error displaying celebrity create form", e);
            next(e);
        });
});



// CREATE: process form
router.post("/celebrities/create", (req, res, next) => {

    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };

    Celebrity.create(newCelebrity)
        .then( (newCelebrity) => {
            res.redirect("/celebrities");
        })
        .catch( e => {
            console.log("error creating new celebrity data", e);
            next(e);
        });
});




module.exports = router;
