const CelebrityModel = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/celebrities/create", (req, res, next)=> {
   res.render("celebrities/new-celebrity.hbs") 
})

router.post("/celebrities/create", (req, res, next)=>{
    const {name, occupation, catchPhrase} = req.body

    CelebrityModel.create({name, occupation, catchPhrase})
    .then(()=>{
        res.redirect("/celebrities")
    })
    .catch(()=>{
        res.render("celebrities/new-celebrity.hbs")
    })
})

router.get("/celebrities", (req, res, next)=>{
    CelebrityModel.find()
    .then((celebrities)=>{
        res.render("celebrities/celebrities.hbs", {celebrities})
    })
    .catch((err)=>{
        console.log(err)
        next(err)
    })
})

module.exports = router;
