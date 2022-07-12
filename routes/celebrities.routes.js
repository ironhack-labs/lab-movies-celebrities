const router    = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity"); 
})
  

router.post("/celebrities/create", (req, res) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
      };

      Celebrity.create(celebrityDetails)
      .then( () => {
        res.redirect("/"); //before Iteration4 'List Cel's' just go to "/"
        console.log("a new ceb is born!! -->\n" + celebrityDetails.name + "\n");
      })
      .catch( (error) => {
        console.log("Error creating new Celebrity in DB", error);
        next(error);
      })
  })

router.get("/celebrities", (req, res) => {
    Celebrity.find()
      .then(CelebritiesFromDB => {
        res.render("celebrities/celebrities", {CelebritiesFromDB}); 
      })
      .catch( (error) => {
        console.log("Error getting Celebrities from DB", error);
        next(error);
      })
  });


module.exports = router;