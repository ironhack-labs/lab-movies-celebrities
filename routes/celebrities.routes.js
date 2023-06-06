// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

// GET
router.get("/celebrities/create", (req,res,next) => {
    Celebrity.find()
    .then(celebitiesFromDB => {
        res.render("celebrities/new-celebrity", {celebArr: celebitiesFromDB}); 
    })
    .catch( e => {
        console.log("error show a form to create a celebrity",e);
        next(e);
    })
})

// POST
router.post("/celebrities/create", (req,res,next) => {

const newCeleb = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
};

Celebrity.create(newCeleb)
    .then(() => {
        res.redirect("/celebrities");
    })
    .catch(e => {
        console.log("error send the data from the form to this route to create the celebrity and save it to the database", e);
        res.render("/celebrities/new-celebrity");
        next(e);
    })
})

module.exports = router;