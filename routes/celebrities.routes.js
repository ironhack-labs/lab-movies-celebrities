const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => {
      res.render("celebrities/celebrities", { celebritiesFromDb });
    })
    .catch((err) => console.log(`Err while rendering celebrity list: ${err}`));
});

router.get("/celebrities/create", (req, res, next) => {
  Celebrity.find()
    .then(() => {
      res.render("celebrities/new-celebrity");
    })
    .catch((err) => console.log(`Err while creating celebrity: ${err}`));
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(`Error while adding new celebrity to the DB: ${err}`);
      res.redirect("celebrities/new-celebrity");
    });
});

module.exports = router;
