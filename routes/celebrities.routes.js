const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      const data = {
        celebrities: celebritiesFromDB,
      };
      res.render("celebrities/celebrities", data);
    })
    .catch((e) => {
      console.log("Error getting list of celebrieties from DB", e);
      next(e);
    });
});

// displays a form
router.get("/celebrities/create", (req, res) =>
  res.render("celebrities/new-celebrity")
);

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
      console.log("Error creating celebrity", e);
      res.render("celebrities/new-celebrity");
      next(e);
    });
});

module.exports = router;
