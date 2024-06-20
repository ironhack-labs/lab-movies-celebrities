// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => {
      res.render("celebrities/celebrities", { celebritiesFromDb });
    })
    .catch((e) => {
      console.log(e, "error getting celebrities");
    });
});

router.post("/celebrities/create", (req, res, next) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrity.create(newCelebrity)
    .then((newCelebrity) => {
      res.redirect("/celebrities");
    })
    .catch((e) => {
      //console.log("error creating new celebrity", e);
      // next(e);
      res.render("celebrities/new-celebrity");
    });
});

module.exports = router;
