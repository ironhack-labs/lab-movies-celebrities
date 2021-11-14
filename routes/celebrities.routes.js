const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//CREATE
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.render("index")) //mandar a la página de celebrities
    .catch(() => res.redirect("/celebrities/create"));
});

//LIST OF CELEBRITIES
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((data) => res.render("celebrities/celebrities", { data }))
    .catch((err) => console.log(err));
});

module.exports = router;
