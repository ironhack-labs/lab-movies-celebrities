// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

/* GET celebrities page */
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((allCelebs) => {
            res.render("celebrities", {allCelebs});
        })
        .catch(e => console.log(e));
});

// create the GET route /celebrities/create
// render celebrities/new-celebrity view
router.get("/celebrities/create", (req, res, next) => {
    res.render("new-celebrity");
});

// create the POST route /celebrities/create
// create an instance of the Celebrity model
// (don't forget, we should get all the info from the form through req.body)
// If there is an error, render the celebrities/new-celebrity view so the user can try again
// If there is no error, redirect to the page with the list of celebrities
router.post("/celebrities/create", (req, res, next) => {

    const data = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(data)
    .then(() => {
        res.render("celebrities");
    })
    .catch(e => {
        console.log(e);
        res.render("new-celebrity");
    }) 
});

module.exports = router;


// linked to app.js so that server has access to it