// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const express = require("express")


router.get("/celebrities", (req, res, next) => {
    res.send(" does it show")
  
});


//create

router.get('/celebrities/create' , (req, res, next) =>{
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create' ,  (req, res, next) =>{
    Celebrity.create(req.body)  
    res.render("/celebrities") 
});

module.exports = router;
