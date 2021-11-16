const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model");


/* GET home page */


/* 
router.get("/celebrities", (req, res) => {
  res.render("./celebrities/celebrities");
}); */



// GET CREATE  - Add/Create a new celeb from the form

router.get("/celebrities/create", (req, res) =>  {
    res.render('./celebrities/new-celebrity');
})


// POST CREATE 

router.post("/celebrities/create", (req, res) => {
    const { celebrityName , occupation, catchPhrase} = req.body;
    
    
    Celebrity.create({celebrityName , occupation, catchPhrase})
    .then((createdCelebrity) => {
        console.log(createdCelebrity);
        
        res.redirect("/celebrities")   
    })
    
    .catch((error) =>  res.redirect("/celebrities/create"), console.log(error) )
})


// SHOW ALL CELEBRITIES 


router.get("/celebrities", (req, res) => {
    console.log("This is a console log");
    Celebrity.find()
    .then((celebrityList) => {
        console.log(celebrityList);
        
        res.render("celebrities/celebrities", {celebrityList})
    })


    .catch((err) => console.log(err))
        
})



module.exports = router;