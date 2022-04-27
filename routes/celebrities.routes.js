const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');


//celebrity list
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebsArr) => {

      console.log(celebsArr)

      res.render("celebrities/celebrities", { celebrities: celebsArr });
    })
    .catch(err => {
      console.log("error getting celebrities from DB", err)
      next(err);
    });
});


//create celebrities
router.get("/celebrities/create", (req, res, next) => {

 res.render("celebrities/new-celebrity")
});

router.post("/celebrities/create", (req, res, next) => {

  const newCelebrities={
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase:req.body.catchPhrase
  }
  Celebrity.create(newCelebrities)
  .then((createdCelebrity)=>{
    res.redirect("/celebrities");
  })
  .catch(err => {
    console.log("error getting celebrities from DB", err)
    next(err);
  });
 })



 module.exports = router; 