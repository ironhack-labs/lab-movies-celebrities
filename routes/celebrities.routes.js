const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch(() => res.render("/celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) =>
      res.render("celebrities/celebrities", { celebrities })
    )
    .catch((err) => console.log(err));
});

module.exports = router;
