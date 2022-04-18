// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


//CREAR CELEBS

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
    const { name, ocupacion, catchPhrase } = req.body;

    Celebrity.create({ name, ocupacion, catchPhrase })
        .then(() => {
            res.redirect("/celebrities/create");
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/celebrities");
        });
});

//LISTA DE CLEBS

router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        
        .then((celebrity) => {
            
            res.render("celebrities/celebrities", { celebrity });
        })
        .catch((err) => {
            console.log(err);
        });
});



module.exports = router;
