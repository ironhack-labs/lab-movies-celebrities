// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchphrase } = req.body;

  Celebrity.create({ name, occupation, catchphrase })
    .then((theceleb) => {
      res.redirect("/");
    })
    .catch((error) => res.render("celebrities/new-celebrity"));
});

router.get("/", (req, res) => {
  Celebrity.find()
    .then((theCelebs) => {
      res.render("celebrities/celebrities", { celebs: theCelebs });
    })
    .catch((error) => {
      console.log("no celebs", error);
    });
});

module.exports = router;
