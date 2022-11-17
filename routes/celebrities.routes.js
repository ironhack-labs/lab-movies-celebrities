// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { find } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model")

// all your routes here
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
    .then(() => {
        res.redirect("/celebrities/celebrities")
    })
    .catch((err) =>{
        res.render("celebrities/new-celebrity")
    })
})

router.get("/celebrities/celebrities", (req, res, next) =>{
   Celebrity.find()
   .then((AllCelebs)=>{
    res.render("celebrities/celebrities", {AllCelebs})
   })
   .catch((err) =>{
    console.log(err)
   })
})

module.exports = router;