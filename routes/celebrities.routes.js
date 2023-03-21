// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")


router.get("/celebrities", (req,res,next)=>{
    Celebrity.find({})
    .then (celebritiesArr => {
        res.render ("celebrities/celebrities", {celebrity: celebritiesArr})
    })
    .catch(e => {
        console.log("error creating new celebrity", e);
        next(e);
      })
})




router.get("celebrities/create", (req,res,next)=>{

    res.send("hello")
   res.render("celebrities/new-celebrity")})

router.post("celebrities/create", (req,res,next)=>{
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }
    Celebrity.create(celebrityDetails)
    .then(celebritiesFromDB =>{
        res.redirect("/celebrities")
    })
    .catch(e => {
        console.log("error creating new celebrity", e);
        next(e);
      })
})

module.exports = router;