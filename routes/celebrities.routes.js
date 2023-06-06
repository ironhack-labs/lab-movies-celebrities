const CelebrityModel = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/celebrities", (req, res, next) => {
    
    CelebrityModel.find()
    .then((celebrities) => {
        res.render("celebrities/celebrities", {celebritiesArr: celebrities})
    })
    .catch( e => {
        console.log("error creating new celebrity", e);
        next(e);
    });
})

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
});

router.post("/celebrities/create", (req, res, next) => {
    
    const newCeleb = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    };
    
    CelebrityModel.create(newCeleb)
        .then((newCeleb) =>{
            res.redirect("/celebrities");
        })
        .catch( e => {
            console.log("error creating new celebrity", e);
            next(e);
        });
});








    module.exports = router;
