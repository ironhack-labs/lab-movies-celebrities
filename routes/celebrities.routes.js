// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require Celebrity model in order to use it
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities", (req, res, next) => {
  res.render("celebrities/celebrities");
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  const { celebrity } = req.body;
  Celebrity.create({ celebrity })
    .then(() => res.redirect("/celebrities"))
    .catch((err) =>
      console.log(`Error while creating a new celebrity: ${err}`)
    );
});

module.exports = router;
