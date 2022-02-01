const router = require("express").Router();

const CelDb = require("../models/Celebrity.model");


// ****************************************************************************************
// GET   ROUTE:/celebrities/create    RENDER :celebrities/new-celebrity    
//  Show a form to create a celebrity
// ****************************************************************************************

router.get("/create", (req, res) => res.render("celebrities/new-celebrity"));


// ****************************************************************************************
// POST  ROUTE:/celebrities/create    REDIRECT: /celebrities  
// to submit the form to create a user
// ****************************************************************************************

router.post("/create", (req, res) => {
    console.log("ADDING :",req.body)
    CelDb.create(req.body)
    .then(() =>  res.redirect('/celebrities'))
    .catch((err) => console.log(`Error while creating a new Celebrity: ${err}`));
});
  


// ****************************************************************************************
// GET   ROUTE:/celebrities     RENDER: celebrities/celebrities  
// display all celebrities 
// ****************************************************************************************

router.get("/", (req, res) => {
    CelDb.find() 
    .then((xxx) => {
        console.log("ALL CELEBRITIES",xxx)
        res.render("celebrities/celebrities", {xxx})
    })  
    .catch((err) => console.log(`Error while getting users from the DB: ${err}`));
});
  
module.exports = router;
