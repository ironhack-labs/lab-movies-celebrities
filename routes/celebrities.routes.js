const router = require("express").Router();

const { render } = require("../app");
// all your routes here

const Celebrity = require("../models/Celebrity.model")

router.get("/create", (req, res)=>{
    res.render("celebrities/new-celebrity")
});

router.post("/create", (req, res)=>{
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
    .then(createdCeleb =>{
        console.log("Celebrity created!!", createdCeleb)
        res.redirect("/celebrities")
    })
    .catch(err=> console.log(err))
})

router.get("/", (req, res)=>{
    Celebrity.find()
    .then(allCelebrities=>{
        res.render("celebrities/celebrities", {allCelebrities})
        console.log(allCelebrities)
    })
    .catch(err=> console.log(err))
})

module.exports = router;