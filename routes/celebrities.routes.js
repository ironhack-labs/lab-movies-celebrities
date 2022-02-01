const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

//CREATE NEW CELEBRITY

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(name, occupation, catchPhrase);
  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCeleb) => {
      console.log(`create new celebrity ${newCeleb.name}`);
      res.redirect("/celebrities");
    })
    .catch((error) => {
      console.log(error);
      next(error);
      res.redirect("/celebrities/create");
    });
});

//LIST ALL CELEBRITIES

router.get("/celebrities", (req, res, next) => {
  Celebrity.find().then((foundCelebs) => {
    res.render("celebrities/celebrities", { celebs: foundCelebs });
  });
});

module.exports = router;
