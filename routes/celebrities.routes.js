const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get( "/celebrities/create", (req, res, next) => {
        res.render ("celebrities/new-celebrity");
    })
   
    
    
    router.post("/celebrities/create", (req, res, next)=>{
   const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
     }

  Celebrity.create(celebrityDetails)
    .then(celebrityDetails => {
        res.redirect("/celebrities");
    })

    .catch(error => {
        console.log("error in creating a new celeb", error)
        res.render("/celebrities/new-celebrity")
    })
 })



module.exports = router;