const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');


router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {

  const newCelebrity = {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase
  };


  Celebrity.create(newCelebrity)
      .then( (newCelebrity) => {
          res.redirect("/celebrities");
      })
      .catch( e => {
          console.log("error creating new celebrity", e);
          next(e);
      });
});

router.get("/celebrities", (req, res, next)=> {
  Celebrity.find()
  .then(celebrityFromDB =>{
    res.render("celebrities/celebrities", {celebrity: celebrityFromDB})
  })
  .catch(err => {
    console.log("error getting list of celebrities from DB", err);
  })
})
    
    module.exports = router;