const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model'); 





//READ

router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
    

    .then((celebritiesArr) => {
        console.log( { celebrities: celebritiesArr });

            res.render("celebrities/celebrities", { celebrities: celebritiesArr })
        })
        .catch(err => {
            console.log("error reading celebrities from DB", err)
            next(err);
        });


});







// CREATE: GET
router.get("/celebrities/new", (req, res, next) => {

    Celebrity.find()
        .then((celebritiesArr) => {
            res.render("celebrities/new-celebrity", { celebrities: celebritiesArr });
        })
        .catch(err => {
            console.log("error getting celebrities from DB", err)
            next(err);
        });




})




// CREATE: process form

router.post('/celebrities/new', (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celebrity.create(newCelebrity)
        .then((celebrityFromDB) => {
            res.redirect("/celebrities")
        })
        .catch(err => {
            console.log("error adding new celebrity on DB", err)
            next(err);
        });

});

















module.exports = router;
