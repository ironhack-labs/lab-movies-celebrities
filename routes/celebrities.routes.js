// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


//CREATE
router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then(celebrities => {
            console.log("Lista de personas: ", celebrities);
            res.render("celebrities/celebrities", {celebrities});
        })
        .catch(err => {
            console.log("Error: ", err);
            next(err);
        })
})

router.get("/celebrities/create", (req, res, next) => {

    res.render("celebrities/new-celebrity");
})

router.post("/celebrities/create", (req, res, next) => {
    //Creating an instance of the Celebrity model
    const { name, occupation, catchPhrase } = req.body;
    
    Celebrity.create({name, occupation, catchPhrase})
    .then( celebrity => {
        console.log("What is celebrity?", celebrity);
        res.render("celebrities/celebrities", celebrity);
    })
    .catch( err => {
        console.log("Error creating celebrity", err);
        res.render("celebrities/new-celebrity");
        next()
    })
})


//READ


module.exports = router;