const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

//READ: List all celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrity
    .find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => {
      console.log("Error getting celebrities from DB...", err);
      next(err);
    });
});

//CREATE new celebrity (display form)
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

//CREATE: process form
router.post("/celebrities/create", (req, res, next) => {
  const celebrityDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrity.create(celebrityDetails)
    .then( () => res.redirect("/celebrities"))
    .catch(() => res.redirect("/celebrities/new-celebrity"));
});

module.exports = router;
