const router = require("express").Router();
const { redirect } = require("express/lib/response");
const CelebrityModel = require ("../models/Celebrity.model.js")




//1. crear una ruta get

router.get ("/create", (req, res, next) =>{


        res.render("celebrities/new-celebrity.hbs", {
            
        });

});




// 2.crear una ruta post

router.post("/create", (req, res, next) => {
 
    console.log("probando ruta")
    console.log (req.body)

    const { name, occupation, catchPhrase } = req.body
    
    CelebrityModel.create({
        name,
        occupation,
        catchPhrase
    })
    
    .then((response) => {

        res.redirect("/celebrities");
    })
    .catch((err) => {
        next(err)
    })

});


//3. crear ruta get para listar

router.get("/", (req, res, next) => {

    CelebrityModel.find()
    .then((allCelebrities) => {
  console.log("hola")
      res.render("celebrities/celebrities-list.hbs", {
        allCelebrities
      })
  
    })
    .catch((err) => {
      next(err)
    })
  
  })



module.exports = router;