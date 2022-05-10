const router = require("express").Router();
const CelebritiesModel = require ("../models/Celebrity.model.js")
//1. crear una ruta get

router.get ("/create", (req, res, next) =>{


    res.render("celebrities/new-celebrity.hbs")
})


// 2.crear una ruta post
router.post("/create", (req, res, next) => {
 
    console.log ("probando ruta")
    console.log (req.body)

    const { name, occupation, catchPhrase } = req.body
    
    CelebritiesModel.create({
        name,
        occupation,
        catchPhrase,
    })
    
    .then((response) => {
    res.redirect ("/celebrities")
    })
    .catch((err) =>{
        next (err)
    })

})


//3. crear ruta get para listar

router.get ("/celebrities", (req, res, next) =>{
    CelebritiesModel.find()
    .then ((artistas) =>{

        res.render("celebrities/celebrities.hbs", {
            listArtistas: artistas
        })
    })
    .catch((err) => {
        next(err)
    })
})


module.exports = router;