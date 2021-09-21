// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchphrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchphrase,
  })
    .then((newCeleb) => res.render("celebrities/celebrities"))
    .catch((err) => res.render("celebrities/new-celebrity"));
});

router.get("/", (req, res) => {
  Celebrity.find()
    .then((result) => {
      console.log(result);
      res.render("celebrities/celebrities", { celebrity: result });
    })
    .catch((err) => {
      errorMessage: {
        "it does not work", err;
      }
    });
});

module.exports = router;
