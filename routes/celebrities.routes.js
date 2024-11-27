const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render("celebrities/new-celebrity", celebrities)
    })
    .catch(error => {
        console.log("error creating new celebrity", error);
        next(error);
    });
});

router.post("/celebrities/create", (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celebrity.create(newCelebrity)
    .then((newCelebrity) => {
        res.redirect("/celebrities");
    })
    .catch(error => {
        console.log("error creating new celebrity", error);
        res.render("celebrities/create")
        next(error)
    });
});

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDB) => {
        const data = {
            celebrities: celebritiesFromDB
        }
       
        res.render("celebrities/celebrities.hbs", data)
    })
    .catch(error => {
        console.log("error getting celebrities from DB", error);
        next(error)
    });
});

module.exports = router;
