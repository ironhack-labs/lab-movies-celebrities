// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const express = require("express");
// all your routes here


const Celebrity = require("../models/Celebrity.model");


// Iteration 3

router.get("/celebrities/create", ( req, res, next)=> {
    res.render("celebrities/new-celebrity")
})


router.post("/celebrities/create", ( req, res, next)=>{
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };

    Celebrity.create(newCelebrity)
        .then((newCelebrity)=>{
            res.redirect("/celebrities");
        })
        .catch((e) => {
            console.log("error creating a celebrity", e);
            next(e);
          });
});


// Iteration 4

router.get("/celebrities", (req, res, next)=>{

    Celebrity.find()
        .then((celebritiesFromDB)=>{
            const data = {
                celebrities: celebritiesFromDB,
            };

            res.render("celebrities/celebrities", data)
        })
        .catch((e) => {
            console.log("oups smt wrong happened", e);
            next(e);
          });


})


module.exports = router;