// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// CREATE - display form
router.get("/celebrities/create", (req, res, next) => {
   
    const occupationEnum = Celebrity.schema.path('occupation').enumValues;

    res.render("celebrities/new-celebrity", {occupationEnum});
})

// CREATE - process form
router.post("/celebrities/create",(req,res,next)=>{

    const celebDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(celebDetails)
        .then(celebFromDB => {
            res.redirect("/celebrities");
        })
        .catch(e => {
            console.log("error creating new celebrities", e);
            next(e);
          });
})

// DISPLAY celebrities
router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then(celebsArr => {

            const data = {
                celebs: celebsArr
            };

            res.render("celebrities/celebrities", data);
        })
        .catch(e => {
            console.log("error getting celebrities from DB", e);
            next(e);
          });
})

module.exports = router;