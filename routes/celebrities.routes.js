const router = require("express").Router();
const mongoose = require("mongoose")
const Celebrity = require("../models/Celebrity.model")
// all your routes here

router.get("/celebrities/create" , (req,res) =>{console.log("hola"),
res.render("celebrities/new-celebrity")})

router.post("/celebrities/create", (req, res) =>{
    const {name, ocuppation, catchPhrase} = req.body

    Celebrity
    .create({name, ocuppation, catchPhrase})
    .then(created =>{
        console.log(created), 
        res.redirect("/celebrities")
    })
    .catch(err => console.log(err))
})


router.get("/celebrities", (req,res) => {

 Celebrity
 .find()
 .then(allCelebrities => {
     res.render("celebrities/celebrities", {allCelebrities})
 })  
 .catch(err => console.log(err)) 
})
module.exports = router;