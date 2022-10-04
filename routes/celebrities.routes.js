// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//CREATE: display form
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

//CREATE: process form
router.post("/celebrities/create", (req, res, next) => {
    const celebritiesDetails = {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    };
  
    Celebrity.create(celebritiesDetails)
      .then(() => {
        res.redirect("/celebrities");
      })
      .catch((err) => {
        console.log("error creating new celebrity in DB", err);
        res.render("celebrities/new-celebrity");
        next(err);
      });
  });

//READ: List all celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => {
      console.log("Error getting celebrities from DB...", err);
      next(err);
    });
});


module.exports = router;