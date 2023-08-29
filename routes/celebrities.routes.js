const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// all your routes here



router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {

    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };

    Celebrity.create(newCelebrity)
        .then((newCelebrity) => {
            res.redirect("/celebrities")
        })
        .catch( e => {
            console.log("error creating new celebrity", e);
            next(e);
        });
});


router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((celebritiesFromDB) =>{
            console.log(celebritiesFromDB)

            res.render("celebrities/celebrities", {celebrities: celebritiesFromDB})
        })
        .catch( e => {
            console.log("error finding celebrities", e);
            next(e);
        });

})
module.exports = router;