const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();


router.get("/celebrities/create", (req, res) => {

    Celebrity.find()
    .then( (celebrityArr) => {
    
    res.render("celebrities/new-celebrity", {celebrityArr});
  })
  })
  
  router.post("/celebrities/create", (req, res) => {
    // console.log(req.body)
    const celebrityDetails = {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    };
    Celebrity.create(celebrityDetails)
    .then( () => {
      res.redirect("/celebrities");
    })
    .catch( (error) => {
      console.log("Error creating celebrity in the DB", error);
      res.render("celebrities/new-Celebrity");
    })
  })

  router.get("/celebrities", (req, res) => {

    Celebrity.find()
    .then( (celebrityArr) => {
    
    res.render("celebrities/celebrities", {celebrityArr});
  })
  })




module.exports = router;