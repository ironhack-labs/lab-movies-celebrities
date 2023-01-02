const express = require('express');
const router = express.Router();
const Celebrity = require("../models/Celebrity.model.js")
const mongoose = require("mongoose");



router.get('/celebrities',(req, res, next) => {
    Celebrity.find({}, function(error,celebrities){
       if (error) return console.log(error)
      // console.log(data)
       res.render("celebrities/list", {celebrities})
 
     })
 });
 
 router.get('/celebrities/create', (req, res, next) => {
     res.render("celebrities/new-celebrity")
 });
 

 router.post('/celebrities/create', (req, res, next) => {
   const newCelebrity = req.body;
   Celebrity.create(newCelebrity)
   .then(() => res.redirect('/celebrities'))
   .catch(error => next(error));
 
 });


 module.exports = router;