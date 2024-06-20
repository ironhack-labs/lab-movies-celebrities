// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const e = require("express");
const Celebrity = require('../models/Celebrity.model');
// all your routes here

router.get("/celebrities",(req, res, next) => {
    Celebrity.find()
    .then((allCelebritiesFromDB) =>{
        res.render("celebrities/celebrities",{celebrities : allCelebritiesFromDB})
    })
    .catch((error) => console.log("Failed to retrive all the famous people",error))
})

router.get("/create",(req, res,next)=>{
    Celebrity.find()
        .then(celebritiesFromDb => {
        const data = {
            celebrities : celebritiesFromDb
        }
        res.render("celebrities/new-celebrity", data)
    })
})


router.post("/create", (req, res, next) => {
  
    const { name, occupation, catchphrase } = req.body;
    
    if(!name || !occupation || !catchphrase){
      return  res.render('celebrities/new-celebrity', {msg: "Please provide all of the info"})
    }

  Celebrity.create({ name, occupation, catchphrase })
    .then(() => res.redirect('/celebrities'))
    .catch(error => res.render('celebrities/new-celebrity', error));
});

module.exports = router;