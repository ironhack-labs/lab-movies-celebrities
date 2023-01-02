const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

//Show a form to create a celebrity
router.get("/celebrities/create"), (req, res, next) => {
   res.render("celebrities/new-celebrity")
};
//Send the data from the form to this route to create the celebrity and save it to the database
router.post("/celebrities/create"), (req, res, next) => {
   const {name, occupation, catchPhrase} = req.body;
   Celebrity.create({name, occupation, catchPhrase})
     .then(celebritiesDetails => {
         res.redirect("/celebrities")
     })
     .catch(err => {
        res.render("celebrities/new-celebrity") 
     })
};




















module.exports = router;
