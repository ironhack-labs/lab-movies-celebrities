const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(name, occupation, catchPhrase);
  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCeleb) => {
      console.log(`create new celebrity ${newCeleb.name}`);
      res.render("celebrities");
    })
    .catch((error) => {
      console.log(error);
      next(error);
      res.redirect("/celebrities/create");
    });
});

module.exports = router;
