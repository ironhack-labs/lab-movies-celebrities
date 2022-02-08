const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

router.get("/", (req, res, next) => {
    
    Celebrity.find().then(function(data) {
        res.render("celebrities/celebrities", {celebrities: data})
    })
  });



router.get("/create", (req, res, next)=>{
    res.render("celebrities/new-celebrity")
}); 

router.post("/create", (req, res, next)=>{

    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,  
    }
    
    console.log(req.body)

    Celebrity.create(celebrityDetails)
    .then(celebrity =>{
        res.redirect("/celebrities")
    })
})


router.get("/new-celebrity", (req,res) => {
    res.render("celebrities/new-celebrity")
})


module.exports = router;