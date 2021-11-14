const { response } = require("../app");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// Get celebrities page

router.get("/celebrities/create", (req, res, next) => {



    res.render("celebrities/celebrities")

});


router.post("/celebrities/create", (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body;
    
    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.render("celebrities/new-celebrity"))
        .catch(err => console.log(err))

})


router.get("/celebrities", (req, res, next) => {


    Celebrity.find()
        .then(celebrities => res.render("celebrities/new-celebrity", { celebrities }))
        .catch(err => console.log(err))



})



module.exports = router;
