// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrities = require("../models/Celebrity.model.js")

// all your routes here
router.get("/celebrities/create",(req,res,next)=>{
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create",(req,res,next)=>{
    const {name, occupation, catchPhrase} = req.body
    Celebrities.create({name, occupation, catchPhrase})
    .then(()=>res.redirect("/celebrities"))
    .catch(()=>res.redirect("/celebrities/create"))
})

router.get("/celebrities",(req,res,next)=>{
    Celebrities.find()
    .then(elem => res.render("celebrities/celebrities", {elem}))
    .catch(err => console.log("Error finding celebrities: ", err))
    })

module.exports = router;

