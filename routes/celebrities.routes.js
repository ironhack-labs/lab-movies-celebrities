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

router.get("/celebrities/:celebrityId", async (req, res)=>{
    const celebrityDetail = await CelebrityModel.findById(req.params.celebrityId)
    res.render("celebrities/celebrity-details", {celebrityDetail})
})

router.get("/celebrities/:celebrityId/edit", async (req, res)=>{
    const celebrityEdit = await CelebrityModel.findById(req.params.celebrityId)
    res.render("celebrities/celebrity-edit", {celebrityEdit})
})

router.post("/celebrities/:celebrityId/edit", async (req, res)=>{
    const {name, occupation, catchPhrase} = req.body
    await CelebrityModel.findByIdAndUpdate(req.params.celebrityId),{
        name,
        occupation,
        catchPhrase
    }
    res.redirect("/celebrities")
})

router.post("/celebrities/:celebrityId/delete", async (req, res)=>{
    await CelebrityModel.findByIdAndDelete(req.params.celebrityId)
    res.redirect("/celebrities")
})
module.exports = router;