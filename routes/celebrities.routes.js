// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

// all your routes here
router.get("/celebrities/create", (req,res,next)=> {
res.render("celebrities/new-celebrity");
})

router.post("/celebrities/create", (req,res,next)=> {
 const celebrityDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchphrase: req.body.catchphrase,
 }

 Celebrity.create(celebrityDetails)
 .then(()=> {res.redirect("/celebrities")
 })
 .catch((err)=> {res.redirect("/celebrities/new-celebrity")})

});


//Iteratio 4
router.get("/celebrities", (req,res,next)=>{
   Celebrity.find()
   .then((foundCelebrities)=>{res.render('celebrities/celebrities', {celebrities:foundCelebrities})})
   .catch((err)=>{console.log('there was an error', err)})
})









module.exports = router;