// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model")

// all your routes here
router.get("/celebrities/create", (req,res) =>{
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req,res) => {
    const {name, occupation, catchPhrase} = req.body 
    CelebrityModel.create({name, occupation, catchPhrase})
        .then((result)=>{
            console.log("new Celebrity was created: " + result)
            res.redirect("/celebrities")
        })
        .catch((error) => {
            console.log("An error occured while creating a New Celebrity: " + err)
            res.render("/celebrities/new-celebrity")
        })
    })


module.exports = router;
