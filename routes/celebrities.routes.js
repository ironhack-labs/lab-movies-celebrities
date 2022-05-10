// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => next(err));
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((cel) => res.redirect(`/celebrities`))
    .catch((err) => res.render("celebrities/new-celebrity"));
});




module.exports = router;
