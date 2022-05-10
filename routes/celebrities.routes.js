const router = require("express").Router();
const CelebrityModel = require ("../models/Celebrity.model.js")




//1. crear una ruta get

router.get ("/create", (req, res, next) =>{


        res.render("celebrities/new-celebrity.hbs", {
            
        });

});




// 2.crear una ruta post

router.post("/create", (req, res, next) => {
 
   
    console.log (req.body)

    const { name, occupation, catchPhrase } = req.body
    
    CelebrityModel.create({
        name,
        occupation,
        catchPhrase
    })
    
    .then((response) => {

        res.redirect("celebrities/celebretis-list.hbs");
    })
    .catch((err) => {
        next(err)
    })

});


//3. crear ruta get para listar

router.get("/celebrities", (req, res, next) => {

    CelebrityModel.find()
    .then((allCelebreties) => {
  
      res.render("celebrities/celebretis-list.hbs", {
        allCelebreties
      })
  
    })
    .catch((err) => {
      next(err)
    })
  
  })



module.exports = router;