const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// all your routes here


//GET /celebrities/create (display form)
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
})

//POST /celebrities/create (process form)
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
        .catch(() => {
            res.redirect("celebrities/new-celebrity");
        
        });
});

/* GET /celebrities - display celebrities */
router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then((celebritiesFromDB) => {
            const data = {
                celebrities: celebritiesFromDB
            }
            res.render("celebrities/celebrities", data)
        })
        .catch(e => {
            console.log("error getting celebrities from the DB", e)
            next(e);
        });
});




module.exports = router;