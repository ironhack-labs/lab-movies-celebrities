const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");


router.get("/celebrities/new", (req, res, next) => res.render("celebrities-views/new-celebrity"));



router.post('/celebrity/create', (req, res, next) => {
  console.log("new celebrity: ", req.body);
  Celebrity.create(req.body)
    .then(()=> res.redirect("/celebrities"))
    .catch((err) => console.log(`Error while saving a new celebrity to DB: ${err}`));
});    

  


router.get("/celebrities", (req, res, next) => {
 Celebrity.find()
    .then((celebrityFromDB) => res.render("celebrities-views/celebrities", { celebrityFromDB }))
    .catch((err) => console.log(`Error while getting all celebrities from DB: ${err}`));
});




module.exports = router;