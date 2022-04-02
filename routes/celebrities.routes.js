// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const res = require("express/lib/response");
const Celebrity = require("../models/Celebrity.model");


// all your routes here

router.get("/celebrities/create", (req, res, next) => {
    res.render('celebrities/new-celebrity')
});

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase, ... rest} = req.body
    Celebrity.create({ name, occupation, catchPhrase})
        .then(()=> res.redirect('/celebrities'))
        .catch(error => {
            console.log("error", error)
            res.redirect('/celebrities/create')
        })
})

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("celebrities/celebrities", {celebrities});
        })
        .catch(error => {
            console.log("error", error)
            res.send('Error list'), error
        })
    })

module.exports = router;