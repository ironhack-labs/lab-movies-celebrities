const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

//interaction 3

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      console.log(`${createdCelebrity.name} was create`);
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
});

module.exports = router;
