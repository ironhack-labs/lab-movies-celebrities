const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

//READ: List all celebrities
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
      .then(celebrities => {
        res.render("celebrities/celebrities", { celebrities });
      })
      .catch(err => {
        console.log('Error getting celebrities from DB...', err);
        next(err);
      })
  });

//CREATE: display form
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
})

//CREATE: process form
router.post("/celebrities/create", (req, res, next) => {
  const celebritiesDetails = {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
  }

  Celebrity.create(celebritiesDetails)
  .then( celebritiesDetails => {
      res.redirect("/celebrities")
  })
  .catch(err => {
      console.log("error creating new celebrity in DB", err);
      next();
  })

})


module.exports = router;