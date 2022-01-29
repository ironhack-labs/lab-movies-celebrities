const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

//Create
router.get("/celebrities/new-celebrity", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/new-celebrity", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCeleb) => {
      res.redirect("/celebrities/celebrities");
    })
    .catch((error) => {
      console.log(`It seems that you suck at creating new celebs -> ${error}`);
      res.redirect("celebrities/new-celebrity");
      next(error);
    });
});

//display all celebrities
router.get("/celebrities/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allCelebs) => {
      res.render("celebrities/celebrities", { celebs: allCelebs });
    })
    .catch((error) => {
      console.log(
        `Sounds like something went wrong while getting the super celebs -> ${error}`
      );
      next(error);
    });
});

module.exports = router;
