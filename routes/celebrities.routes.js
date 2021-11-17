const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

// all your routes here

router.get("/celebrities/create",(req,res)=>{
    res.render("celebrities/new-celebrity");
})

router.post("/celebrities/create/",(req,res)=>{
    const { name, occupation, catchPhrase } = req.body;
    Celebrity
    .create({name, occupation, catchPhrase})
    .then((createdCeleb) => {
      res.redirect("celebrities")
    .then((createdCeleb) => {
        return Movie.findByIdAndUpdate(createdCeleb, { $push: { celebrities: createdCeleb._id } })
      })
    .catch( (err) => console.log(err));
});

router.get("/celebrities",(req,res)=>{
   
    Celebrity.find()
    .then((celebList) => { 
    res.render("celebrities/celebrities", { listofCelebs: celebList })
    })
    .catch( (err) => console.log(err));
    })})

module.exports = router;
