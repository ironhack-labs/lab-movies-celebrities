
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//link create celebrity page
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})


//posting new celebrity group to DB
router.post("/celebrities/create",	(req, res, next) => {
    const { name, occupation, phrase } = req.body;  

    Celebrity.create({name, occupation, phrase})
    .then((newCel) => {
        res.redirect("/celebrities");
        // console.log( `Celebrity ${newCel.name} was added`)
    })
    .catch((error) => {
        res.redirect("/celebrities/new-celebrity");
        next(error);
    });
});        


//link celebrity viewing page
router.get("/celebrities", (req, res) => {
    return Celebrity.find()
        .then((allCelebrities) => {
            res.render("celebrities/celebrities.hbs", { allCelebrities });
        })
        .catch((error) => {
            console.log("Error while getting the Celebrities from the DB: ", error); 
        });
});


module.exports = router