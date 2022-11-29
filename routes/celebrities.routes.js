// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
// all your routes here

router.get("/", (req, res, next)=>{

    Celebrity.find()
    .then((celebrities)=>{
        res.render("celebrities/celebrities", {celebrities})
    })
    .catch((err)=>{console.log(err)})
})

router.get("/create", (req, res, next)=>{
 res.render("celebrities/new-celebrity")
})

router.post("/create", (req,res, next)=>{
    Celebrity.create(req.body)
    .then((celebrity)=>{
        res.redirect("/celebrities")
    }).catch((err)=>{
        res.render("celebrities/new-celebrity")
    })
})




module.exports = router;