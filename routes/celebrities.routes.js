// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrities");
});

router.post("/celebrities/create", (req, res) => {
  const data = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };
  Celebrity.create(data)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      res.render("celebrities/new-celebrities", error);
      next(error);
    });
});

//list celebrities

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("celebrities/celebrities", { celebritiesFromDB });
    })
    .catch((error) => {
      console.log("Error getting data from DB", error);
      next(error);
    });
});

module.exports = router;
