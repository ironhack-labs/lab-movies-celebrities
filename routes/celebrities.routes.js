const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next)=>{
  res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next)=>{
  const {name, occupation, catchPhrase} = req.body;
  
  Celebrity
    .create({name, occupation, catchPhrase})
    .then((dataFromDB)=>{
      console.log(dataFromDB)
      res.redirect("/celebrities")
    })
    .catch( (error) => {
      console.log("Error creating new celebrity in the DB", error);
      next(error);
    });

})

router.get("/celebrities", (req, res, next)=>{
  Celebrity
    .find()
    .then((celebrityFromDB)=>{
      console.log(celebrityFromDB)
      const data= {
        celebrityArr: celebrityFromDB
      }
      res.render("celebrities/celebrities", data)
    })
    .catch( (error) => {
      console.log("Error showing celebrities from the DB", error);
      next(error);
    });
})

router.get("/movies", (req, res, next)=>{
  res.render("movies/movies")
})

module.exports = router;