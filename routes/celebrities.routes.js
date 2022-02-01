const router = require("express").Router();

const CelDb = require("../models/Celebrity.model");


// ****************************************************************************************
// GET   ROUTE:/celebrities/create    RENDER :celebrities/new-celebrity    HBS:new-celebrity.hbs
//  Show a form to create a celebrity
// ****************************************************************************************

router.get("/create", (req, res) => res.render("celebrities/new-celebrity"));

// ****************************************************************************************
// POST  ROUTE:/celebrities/create    REDIRECT: /celebrities   => HBS:celebrity.hbs
// to submit the form to create a user
// ****************************************************************************************

router.post("/create", (req, res) => {
    console.log("ADDING :",req.body)
    CelDb.create(req.body)
    .then(() =>  res.redirect('/celebrities'))
    .catch((err) => console.log(`Error while creating a new Celebrity: ${err}`));
});
  


// ****************************************************************************************
// GET   ROUTE:/celebrities     RENDER: celebrities/celebrities  => HBS:celebrities.hbs
// route to display all users from the DB
// ****************************************************************************************

router.get("/", (req, res) => {
    CelDb.find() // <-- .find() method gives us always an ARRAY back
    .then((xxx) => {
        console.log("ALL CELEBRITIES",xxx)
        res.render("celebrities/celebrities", {xxx})
    })  
    .catch((err) => console.log(`Error while getting users from the DB: ${err}`));
});
  
module.exports = router;
