const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allTheCelebritiesFromDB) => {
      console.log("Retrieved celebrities from DB:", allTheCelebritiesFromDB);

      res.render("celebrities/celebrities", { allTheCelebritiesFromDB });
      console.log(allTheCelebritiesFromDB);
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);

      next(error);
    });
});

router.post("/create", (req, res, next) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  console.log(name);
  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      console.log(createdCelebrity);
      res.redirect(`/celebrities/${createdCelebrity.name}`);
    })
    .catch((err) => res.render("celebrities/new-celebrity"));
});

module.exports = router;
