const express = require('express');
const router = express.Router(); 
// This is the Router class inside the Express library

const Celebrity = require('../models/Celebrity.model');


//ADD NEW CELEB
router.get("/create" , (req, res, next) => {
    res.render("./celebrities/new-celebrity")
})

router.post("/create" , (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body

    Celebrity.create( {name, occupation, catchPhrase} )
    .then((newCeleb) => {
        console.log(newCeleb);
        res.redirect('back'); 
    })
    .catch((err)=> {
        console.log("Error adding new celeb: ", err)
        res.redirect("create");
    })
})





router.get("/" , (req, res, next) => {
    res.render("./celebrities/celebrities")
})


module.exports = router;