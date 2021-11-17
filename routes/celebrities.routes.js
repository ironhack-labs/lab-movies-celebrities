const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/celebrities/create",(req,res)=>{
    res.render("celebrities/new-celebrity");
})


router.post("/celebrities/create/:id",(req,res)=>{
    
    const { name, occupation, catchPhrase } = req.body;
    Celebrity
    .create({name, occupation, catchPhrase})
    .then((createdCeleb) => {
      res.redirect(`celebrities${createdCeleb._id}`);
    })
    .then((createdCeleb) => {
        return Movie.findByIdAndUpdate(createdCeleb, { $push: { celebrities: createdCeleb._id } })
      })
    .catch( (err) => console.log(err));
});

router.get("/celebrities",(req,res)=>{
   
    Celebrity.find()
    .then((celebList) => {  // array with found books
        console.log(celebList)
        
        res.render("celebrities/celebrities", { listofCelebs: celebList })
      })
      .catch( (err) => console.log(err));
    })












module.exports = router;
