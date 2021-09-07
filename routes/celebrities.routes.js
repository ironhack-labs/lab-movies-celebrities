// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

//GET LIST
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebsFromDB) => {
      res.render("celebrities/celebrities", { celebrities: celebsFromDB });
    })
    .catch((err) => next(err));
});

//GET CREATE
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

//POST CREATE
router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      console.log(err.message);
      res.render("celebrities/new-celebrity");
    });
});

module.exports = router;
