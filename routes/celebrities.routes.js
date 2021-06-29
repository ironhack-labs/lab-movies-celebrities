// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model")
// all your routes here

router.get("/celebrities/create", async (req, res)=>{
    
    const allCelebrities = await CelebrityModel.find()
    res.render("celebrities/new-celebrity", {allCelebrities})
})

router.post("/celebrities/create", async(req, res)=>{
    try{
        const {name, occupation, catchPhrase} = req.body
        await CelebrityModel.create({name, occupation, catchPhrase})
        console.log(`${name} created`)
        res.redirect("/celebrities")
    }
    catch(e){
        console.log(e)
        res.redirect("/celebrities/create")
    }
    
})

router.get("/celebrities", async(req, res)=>{
    try{
        const celebritiesList = await CelebrityModel.find()
        res.render("celebrities/celebrities", {celebritiesList})
    }
    catch(e){
        console.log(e)
    }
})




module.exports = router;