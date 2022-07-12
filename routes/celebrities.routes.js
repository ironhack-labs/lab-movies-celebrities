// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const app = require("../app");

const Celebrity = require('../models/Celebrity.model.js');


router.get('/celebrities/create', (req, res, next) => {
    
    res.render('celebrities/new-celebrity');
})

router.post("/celebrities/create", (req, res, next) => {

    

    Celebrity.create(req.body)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((error) => {
            console.log("Error creating new celebrity", error)
            res.render("celebrities/new-celebrity")
        });
});

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render("celebrities/celebrities", {celebrities})
    })
    .catch((error) => {
        console.log("Error getting data from Celebrity, error")
    })
});



module.exports = router;