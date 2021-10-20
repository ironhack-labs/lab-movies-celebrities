const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


router.get("/celebrities/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/new-celebrity", allCelebrities);
    })
    .catch((error) => {
      console.log("Error getting celebrities from DB", error);
      next(error);
    });

});


router.post("/celebrities/create", (req, res, next) => {

  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities")
     
    })
    .catch((error) => {
      console.log("Error getting celebrities from DB", error);
      next(error);
      res.redirect("/celebrities/new-celebrity")
    });
})

router.get("/celebrities",(req,res,next)=>{
  Celebrity.find()
  .then((celFromDB) =>{

    const data = {
      celArray:celFromDB
    }
    res.render("celebrities/celebrities",data)
  })
  .catch( (error) => {
    console.log("Error getting list of celebrities from DB", error);
    next(error);
});


});




module.exports = router;