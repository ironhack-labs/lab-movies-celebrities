
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//link create celebrity page
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})


//link celebrity viewing page
router.get("/celebrities", (req, res) => {
    return Celebrity.find()
        .then((allCelebrities) => {
            res.render("celebrities/celebrities.hbs", { celebrity: allCelebrities });
        })
        .catch((error) => {
            console.log("Error while getting the Celebrities from the DB: ", error); 
        });
});


//posting new celebrity group to DB
router.post("/celebrities/create",	(req, res) => {
    const { name, occupation, phrase } = req.body;  

    Celebrity.create({name, occupation, phrase})
    .then(() => {
        res.redirect("/celebrities");
    })
    .catch((error) => res.redirect("/celebrities/create"))
});


module.exports = router