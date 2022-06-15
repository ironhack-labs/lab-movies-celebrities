const router =require("express").Router();
const Cele= require ("../models/Celebrity.model");

//CREAR UNA CELEBRIDAD 
router.get("/celebrities/create",(req,res,next)=>{

    res.render("celebrities/new-celebrity")
});

router.post("/celebrities/create",(req,res,next)=>{

    const {name,occupation,catchPhrase} = req.body

Cele.create({name,occupation,catchPhrase})
.then(celebry =>{

    console.log("Que es el celebry",celebry)
    res.render("celebrities/celebrities",celebry)
})
.catch(error=>{

    res.render("celebrities/new-celebrity")
    console.log("Cual es el error",error)
})
})


//lista de celebridades

router.get("/celebrities",(req,res,next)=>{

Cele.find()
.then(celebrities =>{
    res.render("celebrities/celebrities.hbs",{celebrities})
})
.catch(error=>{
    console.log("Cual es el error",error)
})
})






module.exports= router;
