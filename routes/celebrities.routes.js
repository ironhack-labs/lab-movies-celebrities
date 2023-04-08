const express=require('express')
const router = require("express").Router();

const celebrityModel=require("../models/Celebrity.model")

router.get('/new-celebrity',(req,res)=>{
    try{
        res.render('celebrities/new-celebrity');
       //res.send("newpage with new celebrities")
    }
    catch(err){
        console.log("Error rendering new celebrity",err)
    }
})

router.post('/new-celebrity',async(req,res)=>{
    try{
    const newCelebrityCreated=await celebrityModel.create(req.body)
    console.log("celebrity created ")
    res.redirect('/celebrities')
    }
    catch{
        res.render('celebrities/new-celebrity')
    }
    //res.render('/celebrities/new-celebrity')
})

router.get('/celebrities',async(req,res,next)=>{
    try{
        const celebrities=await celebrityModel.find()
        res.render('celebrities/celebrities',{celebrities}) 
    }
    catch(err){
console.log('Error getting celebrity', err)
    }
})

module.exports = router;