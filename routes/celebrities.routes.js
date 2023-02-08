// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  if (name !== "" && occupation !== "" && catchPhrase !== "") {
    Celebrity.create({ name, occupation, catchPhrase })
      .then((newCelebrity) => {
        res.render("celebrities/celebrities", { celebrity: newCelebrity });
      })
      .catch((err) => next(err));
  } else {
    res.redirect("/celebrities/create");
  }
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allCelebritiesFromDb) =>
      res.render("celebrities/celebrities", { celebrity: allCelebritiesFromDb })
    )
    .catch((err) => next(err));
});

// router.get("/celebrities", (req, res) => {
//   res.render("");
// });

module.exports = router;
