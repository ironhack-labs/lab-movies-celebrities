// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/new-celebrity", { celebritiesArr: celebrities });
    })
    .catch((err) => {
      console.log("Error displaying form...", err);
    });
});

router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const celebrityDetails = { name, occupation, catchPhrase };
  Celebrity.create(celebrityDetails)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      res.render("celebrities/new-celebrity");
      console.log("error creating new celebrity:", err);
    });
});

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/celebrities", {
        allCelebritiesArr: allCelebrities,
      });
    })
    .catch((err) => {
      console.log("Error showing celebrity list...", err);
    });
});

module.exports = router;
