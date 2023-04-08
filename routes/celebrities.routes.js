const CelebrityModel = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/create", (req, res)=>{
    res.render("celebrities/new-celebrity")
})
router.post("/create",async(req,res)=>{
    try{const newCelebrityCreated = await CelebrityModel.create(req.body)
        console.log(newCelebrityCreated) 
        res.redirect("/celebrities")
      }
    catch(err){console.log("There's an error", err)}
})

router.get("/", async(req, res)=>{
    try{
    const allCelebrities = await CelebrityModel.find()
    console.log(allCelebrities)
    res.render("celebrities/celebrities", {allCelebrities})
    }
    catch(err){
        console.log("there's an error",err)
    }

})
module.exports = router;