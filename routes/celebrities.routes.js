const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//interaction 3

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      console.log(`${createdCelebrity.name} was created`);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("/celebrities/new-celebrity");
      next(err);
    });
});
// interaction 4

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((listCelebrities) =>
      res.render("celebrities/celebrities", { celebrities: listCelebrities })
    )
    .catch((err) => {
      console.log("Celebrity not found");
    });
});

module.exports = router;
