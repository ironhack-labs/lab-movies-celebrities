// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here ---------------------------

//create a celeb':
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      next(err);
      res.render("celebrities/new-celebrity");
    });
});

//display list of celebrities:
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((listOfCeleb) =>
      res.render("celebrities/celebrities.hbs", { listOfCeleb })
    )
    .catch((err) => {
      console.log(err);
    });
});

//finally export: ---------------------------
module.exports = router;
