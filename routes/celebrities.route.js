const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrity/create", (req, res, next) => {
    const data = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celebrity.create(data)
        .then(()=>{
            res.render("/celebrities");
        })
        .catch((e) => {
            console.log(e);
            res.render("/new-celebrity");
        })
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((arrOfCeleb) => {
            res.render("/celebrities", {arrOfCeleb}); 
        })
        .catch(e => console.log(e));
})
module.exports = router;