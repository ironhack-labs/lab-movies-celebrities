const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

//GET ROUTE TO CREATE CELEBRITIES:
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCeleb) => {
      console.log("NEW CELEBRITY CREATED -->: ", newCeleb);
      res.redirect("/celebrities");
    })
    .catch((error) => res.render("celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then((foundCeleb) => {
      console.log(foundCeleb);
      res.render("celebrities/celebrities", { celebs: foundCeleb });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
