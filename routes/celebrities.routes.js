const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

//Show a form to create a celebrity
router.get("/celebrities/create", (req, res, next) => {
   res.render("celebrities/new-celebrity")
});
//Send the data from the form to this route to create the celebrity and save it to the database
router.post("/celebrities/create", (req, res, next) => {
   const {name, occupation, catchPhrase} = req.body;
   Celebrity.create({name, occupation, catchPhrase})
     .then(celebritiesDetails => {
         res.redirect("/celebrities")
     })
     .catch(err => {
        res.render("celebrities/new-celebrity") 
     })
});
//display a list of all the celebrities
router.get("/celebrities", (req, res, next) => {
   Celebrity.find()
     .then((celebritiesFromDB) => {
       console.log(celebritiesFromDB);
 
       res.render("celebrities/celebrities", { celebrities: celebritiesFromDB });
     })
     .catch((err) => {
       console.log("error getting celebrities from DB", err);
       next();
     });
 });



module.exports = router;
