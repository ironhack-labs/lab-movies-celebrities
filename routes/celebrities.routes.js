const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");

/* GET route */
router.get("/celebrities", (req, res, next) => {
  return Celebrity.find()
    .then((allCelebritiesFromDB) => {
      res.render("celebrities/celebrities.hbs", { allCelebritiesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);
      next("/celebrities");
    });
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((error) => next("celebrities/new-celebrity"));
});




module.exports = router;