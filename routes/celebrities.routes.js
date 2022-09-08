
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
// all your routes here

router.get("/create", (re1,res) =>{
    res.render("celebrities/new-celebrity")
})

router.post("/create", (req,res) =>{
    
    Celebrity.create(req.body)
    .then(newCelebrity =>{
        console.log(newCelebrity);
        res.redirect("/celebrities")
    })
    .catch(err =>{console.log(err)})
})

router.get("/", (req,res) =>{
    Celebrity.find()
        .then(celebrities =>{
            console.log(celebrities);
            res.render("stars/celebrities", {celebrities : celebrities})
        })
        .catch(err =>{console.log(err)}) 
})



module.exports = router;