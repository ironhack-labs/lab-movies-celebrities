const router = require("express").Router();
let Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req,res)=>{
    res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", (req,res)=>{

    let {name, occupation, catchPhrase} = req.body;
 
    async function createCelebInDb(){
     try{
        let createdCeleb = await Celebrity.create({name, occupation, catchPhrase});
        res.redirect("/celebrities");
     }
     catch(error){
        console.log(error)
        res.redirect("/celebrities/create");
     }
    }
 createCelebInDb();
 });

router.get("/celebrities", (req,res)=>{
    async function findAllCelebs(){
        try{
            let allCelebs = await Celebrity.find();
            res.render("celebrities/celebrities.hbs", {celebrities: allCelebs});
        }
        catch(error){
            console.log(error);
        }
      }
      findAllCelebs();
})



module.exports = router;