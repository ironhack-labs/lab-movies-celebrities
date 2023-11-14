const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/celebrities/create", (req, res) => {
  res.render("./celebrities/new-celebrity.hbs");
});
router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(name, occupation, catchPhrase);
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebDB) => {
      console.log("new created", celebDB);
      res.redirect("/celebrities");
    })
    .catch((err) => res.render("celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then((celebrityList) => {
      console.log("celebrities", celebrityList);
      res.render("./celebrities/celebrities.hbs", { celebs: celebrityList });
    })
    .catch((err) => console.log("no celeb", err));
});

module.exports = router;
