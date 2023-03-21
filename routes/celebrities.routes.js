const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/celebrities/create", (req, res, next) => {

    res.render("celebrities/new-celebrity");

})

router.post("/celebrities/create", (req, res, next) => {

    const celebrityDetails = {

        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };

    Celebrity.create(celebrityDetails)
        .then(celebrityFromDB => {
            res.render("celebrities/celebrities");
        })
        .catch(e => {
            console.log(`Something wrong with creating celebrity`, e)
        })
})

router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then(listFromDB => {
            const data = {
                celebrity: listFromDB
            }
            res.render("celebrities/celebrities", data);
        })
        .catch(e => {
            console.log(`Something wrong with loading celebrities`, e)
        })
})






module.exports = router;