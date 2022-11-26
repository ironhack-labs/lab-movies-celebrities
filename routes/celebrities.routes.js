const Celebrity = require("./../models/Celebrity.model");
// const express = require('express');
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
//ruta get para celebrities
//addind new celebrities--metodo get
router.get("/celebrities/create", (req, res) => {
    // console.log("ESTE -----> ",req)
    res.render("celebrities/new-celebrity")
});

//ruta con el metodo post
router.post("/celebrities/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    // console.log(req.body)
    Celebrity
    .create({ name, occupation, catchPhrase })
    .then(() => {
        res.redirect("/celebrities")
    })
    .catch(err => {
        res.render("celebrities/new-celebrity")
        console.log(err)
    })
});

router.get("/celebrities", (req, res) => {
    Celebrity
    .find()
    .then((nameCelebrities) => {
        res.render("celebrities/celebrities", { nameCelebrities });
    })
    .catch(err => console.log(err))
});

module.exports = router;